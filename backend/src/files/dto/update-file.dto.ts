import { ApiProperty } from '@nestjs/swagger';
import { Folder } from '../../folders/entities/folder.entity';
import { IsString, IsUUID, MaxLength } from 'class-validator';

export class UpdateFileDto implements Readonly<UpdateFileDto> {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty()
    @IsString()
    @MaxLength(500)
    url: string;

    @ApiProperty()
    folder: Folder;
}

