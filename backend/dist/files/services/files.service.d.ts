/// <reference types="multer" />
import { Repository } from 'typeorm';
import { AwsS3Service } from '../services';
import { CreateFileDto } from '../dto/create-file.dto';
import { File } from '../entities/files.entity';
import { UpdateFileDto } from '../dto/update-file.dto';
export declare class FilesService {
    private readonly repo;
    private readonly awsS3Service;
    private readonly logger;
    constructor(repo: Repository<File>, awsS3Service: AwsS3Service);
    upload(file: Express.Multer.File): Promise<{
        Location: string;
    }>;
    create(data: CreateFileDto, file: Express.Multer.File): Promise<CreateFileDto & File>;
    update(id: string, data: UpdateFileDto): Promise<{
        folder: import("../../folders/entities/folder.entity").Folder;
        url: string;
        id: string;
        isActive: boolean;
        isDeleted: boolean;
    } & File>;
    findAll(query: any): Promise<File[]>;
    findOne(id: string): Promise<File>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
