import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
  Logger
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AwsS3Service } from '../services';
import { CreateFileDto } from '../dto/create-file.dto';
import { File } from '../entities/files.entity';
import { UpdateFileDto } from '../dto/update-file.dto';

@Injectable()
export class FilesService {
  private readonly logger = new Logger(FilesService.name);

  /**
   * Constructor
   * @param {service<AwsS3Service>} awsS3Service
   */
  constructor(
    @InjectRepository(File)
    private readonly repository: Repository<File>,
    private readonly awsS3Service: AwsS3Service,
  ) { }

  /**
   * Upload File
   * @param {Express.Multer.File} file
   * @returns {Promise<Object>}
   */
  async upload(file: Express.Multer.File) {
    const AWS_BUCKET_FOLDER = process.env.AWS_S3_BUCKET_FOLDER;
    const response = {
      Location: '',
    };

    const awsLocation = await this.awsS3Service.uploadToS3(
      file,
      AWS_BUCKET_FOLDER,
    );
    response.Location = awsLocation.Location;
    return response;
  }

  /**
   * create record
   * @param {string} id
   * @param {CreateFileDto} data
   */
  async create(
    data: CreateFileDto,
    file: Express.Multer.File
  ) {
    try {
      const fileLocation = await this.upload(file);
      data.url = fileLocation.Location;
      return await this.repository.save(data);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Update record
   * @param {string} id
   * @param {UpdateFileDto} data
   */
  async update(
    id: string,
    data: UpdateFileDto,
  ) {
    try {
      const record = await this.repository.findOne({
        where: {
          id: id,
        },
      });

      if (!record) {
        throw new NotFoundException(`Record #${id} not found`);
      }

      return await this.repository.save({
        ...record,
        ...data,
        updatedAt: Date.now()
      });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * fetch records
   * @param {Object} query
   * @returns record[]
   */
  async findAll(query) {
    try {
      const queryParam = query && query?.filter ? JSON.parse(query.filter) : {};
      return await this.repository.find({
        where: queryParam,
        relations: ['folder'],
      })
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * fetch record by id
   * @param {string} id
   * @returns record[]
   */
  async findOne(id: string) {
    try {
      const record = await this.repository.findOne({
        where: {
          id: id,
        },
        relations: ['folder'],
      });

      if (!record) {
        throw new NotFoundException(`Record #${id} not found`);
      }
      return record;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * delete record by id
   * @param {string} id
   * @returns 
   */
  async remove(id: string) {
    try {
      return await this.repository.delete(id);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
