# School Integral Guidelines

## PLEASE READ


###### Prerequisites

- Install Node 14 LTS

- Install [docker](https://docs.docker.com/get-docker/) and [docker-compose](https://docs.docker.com/compose/install/)

### Database

- [MYSQL]

### Database Client

- You can install sqlelectron or any gui tool for accessing the Database

### Developer instructions

- Install NestJS globally with `npm i -g @nestjs/cli`.
- Clone repo and run command `npm i`
- Run command `npm run create:env` to copy .env.sample to .env
- cd into deployment folder and run `make container-up` it'll up and run a local mysql.

- Preferred commands for developers
  `npm run start:dev`
- Developer must need to build his code before push
  `npm run build`
- Before your PR, you need to check lint, format and test.

### Developer instructions - makefile

- You must install make command to run commands via makefile
- otherwise run via manually
- Install NestJS globally with `npm i -g @nestjs/cli`.
- Clone all the repo inside a single folder

###### Run the tests

- `npm run test`

###### Bird's eye view of the existing APIs using the SwaggerUI

- Browse <http://localhost:8080/swagger/>
  in place of 8011 use your project's port

###### Server automation

- `make automate ` - this will up all necessary resources in aws and build the docker containers for frontend, backend and mysql

- Make sure you have your .pem file in ./aws_login_1.pem  and change it to your file name 


###### For running locally

1. run docker-compose up -d  the nstop frontend and backend. You wont need it. You will only need mysql

2. cd into frontend and run npm run dev
    - create a .env.local file and add:
      NEXT_PUBLIC_API_ENDPOINT=http://localhost:5007
      NEXT_PUBLIC_HOST=http://localhost:3000
3. cd into backend and run:
    - npm run create:env
    - npm run start:dev




