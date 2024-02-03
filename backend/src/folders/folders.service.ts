import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Folder } from './entities/folder.entity';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { IUser } from '../users/interfaces/user.interface';

@Injectable()
export class FoldersService {
  /**
   * Constructor
   * @param {Repository<Folder>} repo
   */
  constructor(
    @InjectRepository(Folder)
    private readonly repo: Repository<Folder>,
  ) { }

  /**
   * Create record
   * @param {CreateFolderDto} data
   * @returns record
   */
  async create(data: CreateFolderDto, user: IUser) {
    try {
      return await this.repo.save({ ...data, user: user });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * fetch records
   * @param {Object} query
   * @returns record[]
   */
  async findAll(query) {
    try {
      const queryParam = query && query?.filter ? JSON.parse(query.filter) : {};


      // const x = [{
      //   "id": "49e6d06e-e2e7-4bef-b456-d2e5e680c558",
      //   "isActive": true,
      //   "isDeleted": false,
      //   "name": `folder-${Math.random()}`,
      //   "user": {
      //     "id": "9e2f4917-d882-43c3-8c4e-de0db9f75a1a",
      //     "isActive": true,
      //     "isDeleted": false,
      //     "email": "john@gmail.com",
      //     "password": "$2b$08$B9UPe04uIcD2zfitxc6gm.trLsDgU04t/JTAB7UKmva3m7XrgHzq2",
      //     "firstName": null,
      //     "lastName": null
      //   },
      //   "parent": null,
      //   "children": [
      //     {
      //       "id": "4b061520-019f-41c3-9e86-b510972a4786",
      //       "isActive": true,
      //       "isDeleted": false,
      //       "name": "folder-ttl"
      //     }
      //   ]
      // }]
      // return x;
      return await this.repo.find({
        where: queryParam,
        relations: ['user', 'parent', 'children'],
      })
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * fetch record by id
   * @param {string} id
   * @returns record[]
   */
  async findOne(id: string) {
    try {
      const record = await this.repo.findOne({
        where: {
          id: id,
        },
        relations: ['user', 'parent', 'children'],
      });

      if (!record) {
        throw new NotFoundException(`Record #${id} not found`);
      }
      return record;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Update record
   * @param {string} id
   * @param {UpdateFolderDto} data
   */
  async update(
    id: string,
    data: UpdateFolderDto,
  ) {
    try {
      const record = await this.repo.findOne({
        where: {
          id: id,
        },
      });

      if (!record) {
        throw new NotFoundException(`Folder #${id} not found`);
      }

      return await this.repo.save({
        ...record,
        ...data,
      });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * delete record by id
   * @param {string} id
   * @returns 
   */
  async remove(id: string) {
    try {
      return await this.repo.delete(id);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}

