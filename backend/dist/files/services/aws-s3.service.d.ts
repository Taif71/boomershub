/// <reference types="multer" />
import { S3 } from 'aws-sdk';
export declare class AwsS3Service {
    private AWS_S3_BUCKET;
    private AWS_REGION;
    private s3;
    uploadToS3(file: Express.Multer.File, bucketFolder: string): Promise<S3.ManagedUpload.SendData>;
    deleteFile(key: string): Promise<import("aws-sdk/lib/request").PromiseResult<S3.DeleteObjectOutput, import("aws-sdk").AWSError>>;
}
