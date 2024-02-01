import { BaseEntity } from '../../common/entities';
import { Folder } from 'src/folders/entities/folder.entity';
export declare class File extends BaseEntity {
    url: string;
    folder: Folder;
}
