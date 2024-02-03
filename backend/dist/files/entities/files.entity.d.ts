import { BaseEntity } from '../../common/entities';
import { Folder } from '../../folders/entities/folder.entity';
import { User } from '../../users/entities/user.entity';
export declare class File extends BaseEntity {
    url: string;
    folder: Folder;
    user: User;
}
