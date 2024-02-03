import { Repository } from 'typeorm';
import { Folder } from './entities/folder.entity';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { IUser } from '../users/interfaces/user.interface';
import { User } from '../users/entities/user.entity';
export declare class FoldersService {
    private readonly repo;
    private readonly userRepo;
    constructor(repo: Repository<Folder>, userRepo: Repository<User>);
    create(data: CreateFolderDto, user: IUser): Promise<{
        user: IUser;
        id: string;
        name: string;
        folder: Folder;
    } & Folder>;
    findAll(query: any): Promise<Folder[]>;
    findOne(id: string): Promise<Folder>;
    update(id: string, data: UpdateFolderDto): Promise<{
        updatedAt: number;
        id: string;
        name: string;
        folder?: Folder;
        user: User;
        parent: Folder;
        children: Folder[];
        files: import("../files/entities/files.entity").File[];
        isActive: boolean;
        isDeleted: boolean;
    } & Folder>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
