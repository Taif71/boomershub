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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const file_upload_dto_1 = require("../dto/file-upload.dto");
const files_service_1 = require("../services/files.service");
const create_file_dto_1 = require("../dto/create-file.dto");
const update_file_dto_1 = require("../dto/update-file.dto");
const jwtAuth_guard_1 = require("../../auth/guards/jwtAuth.guard");
const user_decorator_1 = require("../../common/decorators/user.decorator");
const pipes_1 = require("../../common/pipes");
let FilesController = class FilesController {
    constructor(filesService) {
        this.filesService = filesService;
    }
    async create(data, user, file) {
        try {
            return await this.filesService.create(data, user, file);
        }
        catch (err) {
            throw new common_1.HttpException(err, err.status || common_1.HttpStatus.BAD_REQUEST);
        }
    }
    findAll(query, user) {
        try {
            return this.filesService.findAll(query);
        }
        catch (err) {
            throw new common_1.HttpException(err, err.status || common_1.HttpStatus.BAD_REQUEST, {
                cause: new Error(err)
            });
        }
    }
    findOne(id) {
        try {
            return this.filesService.findOne(id);
        }
        catch (err) {
            throw new common_1.HttpException(err, err.status || common_1.HttpStatus.BAD_REQUEST, {
                cause: new Error(err)
            });
        }
    }
    update(id, data) {
        try {
            return this.filesService.update(id, data);
        }
        catch (err) {
            throw new common_1.HttpException(err, err.status || common_1.HttpStatus.BAD_REQUEST, {
                cause: new Error(err)
            });
        }
    }
    remove(id) {
        try {
            return this.filesService.remove(id);
        }
        catch (err) {
            throw new common_1.HttpException(err, err.status || common_1.HttpStatus.BAD_REQUEST, {
                cause: new Error(err)
            });
        }
    }
};
exports.FilesController = FilesController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer Token',
    }),
    (0, swagger_1.ApiOperation)({ summary: 'File or Image Upload Dynamic Bucket' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Return upload information.',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid data',
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({ type: file_upload_dto_1.FileUploadDTO }),
    (0, common_1.UsePipes)(new pipes_1.ValidationPipe(true)),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_file_dto_1.CreateFileDto, Object, Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Fetches records' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns list of records.' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get a record by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns record.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record Not found.',
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "findOne", null);
__decorate([
    (0, common_1.UsePipes)(new pipes_1.NullValidationPipe()),
    (0, common_1.UsePipes)(new pipes_1.ValidationPipe(true)),
    (0, common_1.UsePipes)(new pipes_1.TrimPipe()),
    (0, swagger_1.ApiOperation)({ summary: 'Update record' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return record' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found',
    }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_file_dto_1.UpdateFileDto]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'delete record' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Delete record' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found',
    }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "remove", null);
exports.FilesController = FilesController = __decorate([
    (0, swagger_1.ApiTags)('Files'),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.METHOD_NOT_ALLOWED,
        description: 'Method not allowed',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Server Error!',
    }),
    (0, common_1.UseGuards)(jwtAuth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('files'),
    __metadata("design:paramtypes", [files_service_1.FilesService])
], FilesController);
//# sourceMappingURL=files.controller.js.map