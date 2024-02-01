import { User } from '../entities/user.entity';
export declare class UserDTO implements Readonly<UserDTO> {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    isDeleted: boolean;
    isVerified: boolean;
    createAt: number;
    createdBy: string;
    updatedAt: number;
    updatedBy: string;
    static from(dto: Partial<UserDTO>): UserDTO;
    static fromEntity(entity: User): UserDTO;
}
