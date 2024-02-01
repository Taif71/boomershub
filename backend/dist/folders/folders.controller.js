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
exports.FoldersController = void 0;
const common_1 = require("@nestjs/common");
const folders_service_1 = require("./folders.service");
const create_folder_dto_1 = require("./dto/create-folder.dto");
const update_folder_dto_1 = require("./dto/update-folder.dto");
const jwtAuth_guard_1 = require("../auth/guards/jwtAuth.guard");
const user_decorator_1 = require("../common/decorators/user.decorator");
const swagger_1 = require("@nestjs/swagger");
const pipes_1 = require("../common/pipes");
let FoldersController = class FoldersController {
    constructor(foldersService) {
        this.foldersService = foldersService;
    }
    create(data, user) {
        try {
            return this.foldersService.create(data, user);
        }
        catch (err) {
            throw new common_1.HttpException(err, err.status || common_1.HttpStatus.BAD_REQUEST, {
                cause: new Error(err)
            });
        }
    }
    findAll(query, user) {
        try {
            query.user = user.id;
            return this.foldersService.findAll(query);
        }
        catch (err) {
            throw new common_1.HttpException(err, err.status || common_1.HttpStatus.BAD_REQUEST, {
                cause: new Error(err)
            });
        }
    }
    findOne(id) {
        try {
            return this.foldersService.findOne(id);
        }
        catch (err) {
            throw new common_1.HttpException(err, err.status || common_1.HttpStatus.BAD_REQUEST, {
                cause: new Error(err)
            });
        }
    }
    update(id, data) {
        try {
            return this.foldersService.update(id, data);
        }
        catch (err) {
            throw new common_1.HttpException(err, err.status || common_1.HttpStatus.BAD_REQUEST, {
                cause: new Error(err)
            });
        }
    }
    remove(id) {
        try {
            return this.foldersService.remove(id);
        }
        catch (err) {
            throw new common_1.HttpException(err, err.status || common_1.HttpStatus.BAD_REQUEST, {
                cause: new Error(err)
            });
        }
    }
};
exports.FoldersController = FoldersController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new record' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Return new record.',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid data',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_ACCEPTABLE,
        description: 'Record already exist',
    }),
    (0, common_1.UsePipes)(new pipes_1.NullValidationPipe()),
    (0, common_1.UsePipes)(new pipes_1.ValidationPipe(true)),
    (0, common_1.UsePipes)(new pipes_1.TrimPipe()),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_folder_dto_1.CreateFolderDto, Object]),
    __metadata("design:returntype", void 0)
], FoldersController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Fetches records' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns list of records.' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], FoldersController.prototype, "findAll", null);
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
], FoldersController.prototype, "findOne", null);
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
    __metadata("design:paramtypes", [String, update_folder_dto_1.UpdateFolderDto]),
    __metadata("design:returntype", void 0)
], FoldersController.prototype, "update", null);
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
], FoldersController.prototype, "remove", null);
exports.FoldersController = FoldersController = __decorate([
    (0, swagger_1.ApiTags)('Folders'),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.METHOD_NOT_ALLOWED,
        description: 'Method not allowed',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Server Error!',
    }),
    (0, common_1.UseGuards)(jwtAuth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('folders'),
    __metadata("design:paramtypes", [folders_service_1.FoldersService])
], FoldersController);
//# sourceMappingURL=folders.controller.js.map