import { Folder } from '../../folders/entities/folder.entity';
export declare class CreateFileDto implements Readonly<CreateFileDto> {
    id: string;
    url: string;
    folder: Folder;
}
