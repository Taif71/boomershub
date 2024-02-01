"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsS3Service = void 0;
const common_1 = require("@nestjs/common");
const aws_sdk_1 = require("aws-sdk");
let AwsS3Service = class AwsS3Service {
    constructor() {
        this.AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
        this.AWS_REGION = process.env.AWS_REGION;
        this.s3 = new aws_sdk_1.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        });
    }
    async uploadToS3(file, bucketFolder) {
        const Bucket = this.AWS_S3_BUCKET + '/' + bucketFolder;
        const { buffer, originalname, mimetype } = file;
        const params = {
            Bucket: Bucket,
            Key: String(originalname),
            Body: buffer,
            ContentType: mimetype,
            ContentDisposition: 'inline',
            CreateBucketConfiguration: {
                LocationConstraint: this.AWS_REGION,
            },
        };
        try {
            return await this.s3.upload(params).promise();
        }
        catch (err) {
            console.log('fffggg', err);
            throw new common_1.HttpException(err, err.status || common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteFile(key) {
        try {
            return await this.s3
                .deleteObject({
                Bucket: this.AWS_S3_BUCKET,
                Key: key,
            })
                .promise();
        }
        catch (err) {
            throw new common_1.HttpException(err, err.status || common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.AwsS3Service = AwsS3Service;
exports.AwsS3Service = AwsS3Service = __decorate([
    (0, common_1.Injectable)()
], AwsS3Service);
//# sourceMappingURL=aws-s3.service.js.map