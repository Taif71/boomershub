import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export class AwsS3Service {
  private AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
  private AWS_REGION = process.env.AWS_REGION;
  private s3: S3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  /**
   * Upload File
   * @param {Express.Multer.File} file
   * @param {string} bucketFolder
   * @returns {Promise<Object>}
   */
  async uploadToS3(file: Express.Multer.File, bucketFolder: string) {
    const Bucket = this.AWS_S3_BUCKET + '/' + bucketFolder;
    const s3Payload = this.getUploadParam(Bucket, file)
    await this.handleS3Upload(s3Payload);
  }

  /**
   * Delete File
   * @param {string} key
   * @returns {Promise<Object>}
   */
  async deleteFile(key: string) {
    try {
      return await this.s3
        .deleteObject({
          Bucket: this.AWS_S3_BUCKET,
          Key: key,
        })
        .promise();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  private getUploadParam(Bucket, file) {
   const { buffer, originalname, mimetype } = file;
   return {
      Bucket: Bucket,
      Key: String(originalname),
      Body: buffer,
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: this.AWS_REGION,
      },
    };
  }

  private async handleS3Upload(s3Payload) {
    try {
      return await this.s3.upload(s3Payload).promise();
    } catch (err) {
      console.log('Error: ', err);
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}


