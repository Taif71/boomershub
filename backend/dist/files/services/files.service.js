"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var FilesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const services_1 = require("../services");
const files_entity_1 = require("../entities/files.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const folder_entity_1 = require("../../folders/entities/folder.entity");
let FilesService = FilesService_1 = class FilesService {
    constructor(repo, awsS3Service, userRepo, folderRepo) {
        this.repo = repo;
        this.awsS3Service = awsS3Service;
        this.userRepo = userRepo;
        this.folderRepo = folderRepo;
        this.logger = new common_1.Logger(FilesService_1.name);
    }
    async upload(file) {
        const AWS_BUCKET_FOLDER = process.env.AWS_S3_BUCKET_FOLDER;
        const response = {
            Location: '',
        };
        const awsLocation = await this.awsS3Service.uploadToS3(file, AWS_BUCKET_FOLDER);
        response.Location = awsLocation.Location;
        return response;
    }
    async create(data, user, file) {
        try {
            const fileLocation = await this.upload(file);
            data.url = fileLocation.Location;
            return await this.repo.save({ ...data, user: user });
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(id, data) {
        try {
            const record = await this.repo.findOne({
                where: {
                    id: id,
                },
            });
            if (!record) {
                throw new common_1.NotFoundException(`Record #${id} not found`);
            }
            return await this.repo.save({
                ...record,
                ...data,
                updatedAt: Date.now()
            });
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAll(query) {
        try {
            query && query?.filter && (query.filter = JSON.parse(query.filter));
            let queryParam = {};
            if (query && query?.user) {
                queryParam.user = await this.userRepo.findOne({
                    where: {
                        id: query.user
                    }
                });
            }
            if (query && query?.filter) {
                if (query.filter?.folder === null) {
                    query.filter.folder = (0, typeorm_1.IsNull)();
                }
                else if (query.filter?.folder) {
                    query.filter.folder = await this.folderRepo.findOne({
                        where: {
                            id: query.filter.folder
                        }
                    });
                }
            }
            if (query && query?.filter) {
                queryParam = {
                    ...queryParam,
                    ...query.filter,
                };
            }
            return await this.repo.find({
                where: queryParam,
                relations: ['folder'],
            });
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findOne(id) {
        try {
            const record = await this.repo.findOne({
                where: {
                    id: id,
                },
                relations: ['folder'],
            });
            if (!record) {
                throw new common_1.NotFoundException(`Record #${id} not found`);
            }
            return record;
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async remove(id) {
        try {
            return await this.repo.delete(id);
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.FilesService = FilesService;
exports.FilesService = FilesService = FilesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(files_entity_1.File)),
    __param(2, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_2.InjectRepository)(folder_entity_1.Folder)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        services_1.AwsS3Service,
        typeorm_1.Repository,
        typeorm_1.Repository])
], FilesService);
//# sourceMappingURL=files.service.js.map