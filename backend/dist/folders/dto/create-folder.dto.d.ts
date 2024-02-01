import { Folder } from '../entities/folder.entity';
import { User } from '../../users/entities/user.entity';
export declare class CreateFolderDto implements Readonly<CreateFolderDto> {
    id: string;
    name: string;
    folder: Folder;
    user: User;
}
