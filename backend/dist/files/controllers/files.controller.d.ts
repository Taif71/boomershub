/// <reference types="multer" />
import { FilesService } from '../services/files.service';
import { CreateFileDto } from '../dto/create-file.dto';
import { UpdateFileDto } from '../dto/update-file.dto';
import { IUser } from '../../users/interfaces/user.interface';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    create(data: CreateFileDto, file: Express.Multer.File): Promise<CreateFileDto & import("../entities/files.entity").File>;
    findAll(query: any, user: IUser): Promise<import("../entities/files.entity").File[]>;
    findOne(id: string): Promise<import("../entities/files.entity").File>;
    update(id: string, data: UpdateFileDto): Promise<{
        folder: import("../../folders/entities/folder.entity").Folder;
        url: string;
        id: string;
        isActive: boolean;
        isDeleted: boolean;
    } & import("../entities/files.entity").File>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
