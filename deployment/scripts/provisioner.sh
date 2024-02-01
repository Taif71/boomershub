#!/bin/sh
AWS_REGION=us-east-1
VPC_NAME='boomershub vpc'
VPC_CIDR='10.0.0.0/16'
VPC_ID=""


create_vpc() {
    VPC_OUTPUT=$(aws ec2 create-vpc --cidr-block "$VPC_CIDR" --region "$AWS_REGION" --query 'Vpc.{VpcId:VpcId}' --output text --tag-specifications "ResourceType=vpc,Tags=[{Key=Name,Value='$VPC_NAME'}]")
    # Store the VPC ID by removing trailing whitespace or newline characters
    VPC_ID=$(echo "$VPC_OUTPUT" | tr -d '\r\n')
}

IGW_NAME="boomershub-igw"
IGW_ID=""

create_and_attach_igw() {
    IGW_OUTPUT=$(aws ec2 create-internet-gateway --region "$AWS_REGION" --query 'InternetGateway.{InternetGatewayId:InternetGatewayId}' --output text --tag-specifications "ResourceType=internet-gateway,Tags=[{Key=Name,Value='$IGW_NAME'}]")
    IGW_ID=$(echo "$IGW_OUTPUT" | tr -d '\r\n')
    aws ec2 attach-internet-gateway --vpc-id "$VPC_ID" --internet-gateway-id "$IGW_ID" --region "$AWS_REGION"
}

ROUTE_TABLE_ID=""
ROUTE_TABLE_DESTINATION="0.0.0.0/0"
create_and_update_route_table() {
    ROUTE_TABLE_ID=$(aws ec2 describe-route-tables --region "$AWS_REGION" --filters Name=vpc-id,Values="$VPC_ID" --query 'RouteTables[0].RouteTableId' --output text)
    aws ec2 create-route --route-table-id "$ROUTE_TABLE_ID" --destination-cidr-block "$ROUTE_TABLE_DESTINATION" --gateway-id "$IGW_ID" --region "$AWS_REGION"
}

PUBLIC_SUBNET_NAME=boomers-pub-subnet
PUBLIC_SUBNET_CIDR="10.0.1.0/24"
PUBLIC_SUBNET_ID=""
create_public_subnet() {
    PUBLIC_SUBNET_ID=$(aws ec2 create-subnet --vpc-id "$VPC_ID" --cidr-block "$PUBLIC_SUBNET_CIDR" --region "$AWS_REGION" --query 'Subnet.{SubnetId:SubnetId}' --output text --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value='$PUBLIC_SUBNET_NAME'}]')
}


NODES_SECURITY_GROUP_NAME=boomershub-instances-sg
SECURITY_GROUP_DESCRIPTION='This is a security group for boomershub instances'
NODES_SECURITY_GROUP_ID=""
NODES_SECURITY_GROUP_CIDR="0.0.0.0/0"
create_and_config_security_group_nodes() {
    aws ec2 create-security-group --vpc-id "$VPC_ID" --group-name "$NODES_SECURITY_GROUP_NAME" --description "$SECURITY_GROUP_DESCRIPTION" --region "$AWS_REGION" 
    SG_RESPONSE=$(aws ec2 describe-security-groups --region "$AWS_REGION" --filters Name=group-name,Values="$NODES_SECURITY_GROUP_NAME" Name=vpc-id,Values="$VPC_ID")
    NODES_SECURITY_GROUP_ID=$(echo "$SG_RESPONSE" | grep -o '"GroupId": *"[^"]*' | awk -F'"' '{print $4}')
    aws ec2 authorize-security-group-ingress --group-id "$NODES_SECURITY_GROUP_ID" --protocol all --port -1 --cidr "0.0.0.0/0" --region "$AWS_REGION"
}


INSTANCE_TYPE=t2.medium
AMI_ID=ami-0c7217cdde317cfec  # Replace with your desired AMI ID
KEY_NAME=boomers_pair # Replace with your key pair name

MASTER_NODE_INSTANCE_ID=''
MASTER_NODE_INSTANCE_NAME='master'
MASTER_NODE_INSTANCE_PUBLIC_IP=""
MASTER_NODE_INSTANCE_PRIVATE_IP=""
USER=ubuntu

create_ec2_node() {
    MASTER_NODE_INSTANCE=$(aws ec2 run-instances --image-id "$AMI_ID" --count 1 --instance-type "$INSTANCE_TYPE" --key-name "$KEY_NAME" --subnet-id "$PUBLIC_SUBNET_ID" --security-group-ids "$NODES_SECURITY_GROUP_ID" --region "$AWS_REGION" --query 'Instances[0]' --output json --associate-public-ip-address --tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=$MASTER_NODE_INSTANCE_NAME}]")
    echo "Launched Master INSTANCE..."
    echo "Node are initializing....."
   
    MASTER_NODE_INSTANCE_ID=$(echo "$MASTER_NODE_INSTANCE" | grep -o '"InstanceId": *"[^"]*' | awk -F'"' '{print $4}')
    MASTER_NODE_INSTANCE_PRIVATE_IP=$(echo "$MASTER_NODE_INSTANCE" | grep -m 1 -o '"PrivateIpAddress": *"[^"]*' | awk -F'"' '{print $4}')
    aws ec2 wait instance-running --instance-ids "$MASTER_NODE_INSTANCE_ID"
    MASTER_NODE_INSTANCE_PUBLIC_IP=$(aws ec2 describe-instances --instance-ids "$MASTER_NODE_INSTANCE_ID" --query 'Reservations[0].Instances[0].PublicIpAddress' --output text)
}


KEY_PAIR_FILE='./boomers_pair.pem'
BOOMERSHUB_FOLDER="/home/meem/Desktop/boomershub_project/deployment"
setup_master_instance() {
    echo "public ip: $MASTER_NODE_INSTANCE_PUBLIC_IP"
     echo "private ip: $MASTER_NODE_INSTANCE_PRIVATE_IP"
    # aws ec2 wait instance-running --instance-ids "$MASTER_NODE_INSTANCE_ID"
    ls -la
    chmod 400 "$KEY_PAIR_FILE"
    ssh -i "$KEY_PAIR_FILE" "$USER@$MASTER_NODE_INSTANCE_PUBLIC_IP" 'sudo apt update && sudo apt install docker.io && sudo apt install git && sudo apt install make && sudo apt update'
    scp -i "$KEY_PAIR_FILE" -r "$BOOMERSHUB_FOLDER" "$USER@$MASTER_NODE_INSTANCE_PUBLIC_IP":~
    ssh -i "$KEY_PAIR_FILE" "$USER@$MASTER_NODE_INSTANCE_PUBLIC_IP" 'ls -la && sudo make clone'
}

# Deployment Steps
main() {
    # Execute the functions in sequence
    create_vpc
    create_and_attach_igw
    create_and_update_route_table
    create_public_subnet
    create_and_config_security_group_nodes
    create_ec2_node
    setup_master_instance
}

# Run the deployment
main "$@"