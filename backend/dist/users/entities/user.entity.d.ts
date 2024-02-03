import { BaseEntity } from '../../common/entities';
import { Folder } from '../../folders/entities/folder.entity';
import { File } from '../../files/entities/files.entity';
export declare class User extends BaseEntity {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    folders: Folder[];
    files: File[];
}
