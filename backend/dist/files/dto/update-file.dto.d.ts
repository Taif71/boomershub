import { Folder } from '../../folders/entities/folder.entity';
export declare class UpdateFileDto implements Readonly<UpdateFileDto> {
    id: string;
    url: string;
    folder: Folder;
}
