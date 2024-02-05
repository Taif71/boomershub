import {
    Entity,
    Column,
    ManyToOne,
    OneToMany
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { BaseEntity } from '../../common/entities';
import { User } from '../../users/entities/user.entity';
import { File } from '../../files/entities/files.entity';

@Entity({ name: 'folder' })
export class Folder extends BaseEntity {
    @Column({ type: 'varchar', length: 200 })
    @IsNotEmpty()
    name: string;

    // @ManyToOne(() => Folder, folder => folder.children, { nullable: true })
    @ManyToOne(() => Folder, (parent) => parent.children, {
        onDelete: 'CASCADE', // Specify the ON DELETE option for cascading deletes
        // onUpdate: 'CASCADE', // Specify the ON UPDATE option for cascading updates
    })
    parent: Folder;

    // @OneToMany(() => Folder, folder => folder.parent)
    @OneToMany(() => Folder, (child) => child.parent, { cascade: true })
    children: Folder[];

    @ManyToOne(() => User, user => user.folders)
    user: User;

    // @OneToMany(() => File, file => file.folder)
    @OneToMany(() => File, (child) => child.folder, { cascade: true })
    files: File[];
}
