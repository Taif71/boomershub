import { BaseEntity } from '../../common/entities';
import { User } from '../../users/entities/user.entity';
export declare class Folder extends BaseEntity {
    name: string;
    parent: Folder;
    children: Folder[];
    user: User;
}
