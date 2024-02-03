/// <reference types="multer" />
import { Repository } from 'typeorm';
import { AwsS3Service } from '../services';
import { CreateFileDto } from '../dto/create-file.dto';
import { File } from '../entities/files.entity';
import { UpdateFileDto } from '../dto/update-file.dto';
import { IUser } from '../../users/interfaces/user.interface';
import { User } from '../../users/entities/user.entity';
import { Folder } from '../../folders/entities/folder.entity';
export declare class FilesService {
    private readonly repo;
    private readonly awsS3Service;
    private readonly userRepo;
    private readonly folderRepo;
    private readonly logger;
    constructor(repo: Repository<File>, awsS3Service: AwsS3Service, userRepo: Repository<User>, folderRepo: Repository<Folder>);
    upload(file: Express.Multer.File): Promise<{
        Location: string;
    }>;
    create(data: CreateFileDto, user: IUser, file: Express.Multer.File): Promise<{
        user: IUser;
        id: string;
        url: string;
        folder: Folder;
    } & File>;
    update(id: string, data: UpdateFileDto): Promise<{
        updatedAt: number;
        folder: Folder;
        url: string;
        user: User;
        id: string;
        isActive: boolean;
        isDeleted: boolean;
    } & File>;
    findAll(query: any): Promise<File[]>;
    findOne(id: string): Promise<File>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
