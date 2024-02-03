import { FoldersService } from './folders.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { IUser } from '../users/interfaces/user.interface';
export declare class FoldersController {
    private readonly foldersService;
    constructor(foldersService: FoldersService);
    create(data: CreateFolderDto, user: IUser): Promise<{
        user: IUser;
        id: string;
        name: string;
        folder: import("./entities/folder.entity").Folder;
    } & import("./entities/folder.entity").Folder>;
    findAll(query: any, user: IUser): Promise<import("./entities/folder.entity").Folder[]>;
    findOne(id: string): Promise<import("./entities/folder.entity").Folder>;
    update(id: string, data: UpdateFolderDto): Promise<{
        updatedAt: number;
        id: string;
        name: string;
        folder?: import("./entities/folder.entity").Folder;
        user: import("../users/entities/user.entity").User;
        parent: import("./entities/folder.entity").Folder;
        children: import("./entities/folder.entity").Folder[];
        files: import("../files/entities/files.entity").File[];
        isActive: boolean;
        isDeleted: boolean;
    } & import("./entities/folder.entity").Folder>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
