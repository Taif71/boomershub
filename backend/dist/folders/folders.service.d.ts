import { Repository } from 'typeorm';
import { Folder } from './entities/folder.entity';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { IUser } from '../users/interfaces/user.interface';
export declare class FoldersService {
    private readonly repo;
    constructor(repo: Repository<Folder>);
    create(data: CreateFolderDto, user: IUser): Promise<{
        user: IUser;
        id: string;
        name: string;
        folder: Folder;
    } & Folder>;
    findAll(query: any): Promise<Folder[]>;
    findOne(id: string): Promise<Folder>;
    update(id: string, data: UpdateFolderDto): Promise<{
        id: string;
        name: string;
        folder?: Folder;
        user: import("../users/entities/user.entity").User;
        parent: Folder;
        children: Folder[];
        isActive: boolean;
        isDeleted: boolean;
    } & Folder>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
