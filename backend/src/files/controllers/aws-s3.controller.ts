import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  MethodNotAllowedException,
  Patch,
  Post,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsS3Service } from '../services';
import { FileUploadDTO } from '../dto/file-upload.dto';

@ApiTags('File Upload')
@ApiResponse({
  status: HttpStatus.METHOD_NOT_ALLOWED,
  description: 'Method not allowed',
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Server Error!',
})
@Controller('file')
export class AwsS3Controller {
  private AWS_SERVICE_IMG_BUCKET = process.env.AWS_BUCKET_NAME;
  constructor(private readonly s3Service: AwsS3Service) {}

  
  @ApiOperation({ summary: 'File or Image Upload to S3 Bucket' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return upload information.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileUploadDTO })
  @UseInterceptors(FileInterceptor('file'))
  @ApiExcludeEndpoint()
  @Post('s3/upload')
  async create(@UploadedFile() file: Express.Multer.File) {
    try {
      return await this.s3Service.uploadToS3(file, this.AWS_SERVICE_IMG_BUCKET);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }


  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'File or Image delete from S3 Bucket' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return delete information.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @ApiExcludeEndpoint()
  @Delete('s3/delete')
  async remove(@Body() obj: { key: string }) {
    try {
      return await this.s3Service.deleteFile(obj.key);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}
