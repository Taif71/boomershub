import {
    IsString,
    IsUUID,
    MaxLength,
    MinLength,
    IsNotEmpty,
    IsEmail,
    Matches,
} from 'class-validator';
import { User } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserDTO implements Readonly<UserDTO> {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(18)
    @MinLength(5)
    @Matches(/^[^\s]+(\s+[^\s]+)*$/)
    password: string;

    @ApiProperty()
    @MaxLength(30)
    @MinLength(3)
    @Matches(/^[a-zA-Z ]+$/)
    @IsString()
    firstName: string;

    @ApiProperty()
    @MaxLength(30)
    @MinLength(3)
    @Matches(/^[a-zA-Z ]+$/)
    @IsString()
    lastName: string;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    isDeleted: boolean;

    @ApiProperty()
    isVerified: boolean;

    @ApiProperty()
    createAt: number;

    @ApiProperty()
    createdBy: string;

    @ApiProperty()
    updatedAt: number;

    @ApiProperty()
    updatedBy: string;

    public static from(dto: Partial<UserDTO>) {
        const data = new UserDTO();
        data.id = dto.id;
        data.email = dto.email;
        data.password = dto.password;
        data.firstName = dto.firstName;
        data.lastName = dto.lastName;
        data.isActive = dto.isActive;
        data.isDeleted = dto.isDeleted;
        data.isVerified = dto.isVerified;
        return data;
    }

    public static fromEntity(entity: User) {
        return this.from({
            id: entity.id,
            email: entity.email,
            firstName: entity.firstName,
            lastName: entity.lastName,
            isActive: entity.isActive,
            isDeleted: entity.isDeleted,
        });
    }
}
