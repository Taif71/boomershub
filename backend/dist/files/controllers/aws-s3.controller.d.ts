/// <reference types="multer" />
import { AwsS3Service } from '../services';
export declare class AwsS3Controller {
    private readonly s3Service;
    private AWS_SERVICE_IMG_BUCKET;
    constructor(s3Service: AwsS3Service);
    create(file: Express.Multer.File): Promise<import("aws-sdk/clients/s3").ManagedUpload.SendData>;
    createGet(): void;
    createPatch(): void;
    createPut(): void;
    createDelete(): void;
    remove(obj: {
        key: string;
    }): Promise<import("aws-sdk/lib/request").PromiseResult<import("aws-sdk/clients/s3").DeleteObjectOutput, import("aws-sdk").AWSError>>;
    removeGet(): void;
    removePatch(): void;
    removePut(): void;
    removePost(): void;
}
