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
exports.AwsS3Controller = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const services_1 = require("../services");
const file_upload_dto_1 = require("../dto/file-upload.dto");
let AwsS3Controller = class AwsS3Controller {
    constructor(s3Service) {
        this.s3Service = s3Service;
        this.AWS_SERVICE_IMG_BUCKET = process.env.AWS_BUCKET_NAME;
    }
    async create(file) {
        try {
            return await this.s3Service.uploadToS3(file, this.AWS_SERVICE_IMG_BUCKET);
        }
        catch (err) {
            throw new common_1.HttpException(err, err.status || common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async remove(obj) {
        try {
            return await this.s3Service.deleteFile(obj.key);
        }
        catch (err) {
            throw new common_1.HttpException(err, err.status || common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.AwsS3Controller = AwsS3Controller;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'File or Image Upload to S3 Bucket' }),
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
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, common_1.Post)('s3/upload'),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AwsS3Controller.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer Token',
    }),
    (0, swagger_1.ApiOperation)({ summary: 'File or Image delete from S3 Bucket' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Return delete information.',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid data',
    }),
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, common_1.Delete)('s3/delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AwsS3Controller.prototype, "remove", null);
exports.AwsS3Controller = AwsS3Controller = __decorate([
    (0, swagger_1.ApiTags)('File Upload'),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.METHOD_NOT_ALLOWED,
        description: 'Method not allowed',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Server Error!',
    }),
    (0, common_1.Controller)('file'),
    __metadata("design:paramtypes", [services_1.AwsS3Service])
], AwsS3Controller);
//# sourceMappingURL=aws-s3.controller.js.map