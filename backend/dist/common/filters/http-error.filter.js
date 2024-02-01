"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpErrorFilter = void 0;
const common_1 = require("@nestjs/common");
let HttpErrorFilter = class HttpErrorFilter {
    catch(exception, host) {
        console.log('exception: ', exception);
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status = exception.getStatus
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = status !== common_1.HttpStatus.INTERNAL_SERVER_ERROR
            ? exception.message || exception['error'] || null
            : 'Internal server error';
        if (Object.prototype.hasOwnProperty.call(exception, 'status')) {
            status = exception['status']
                ? exception['status']
                : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            message =
                status !== common_1.HttpStatus.INTERNAL_SERVER_ERROR
                    ? exception.message || exception['error'] || null
                    : 'Internal server error';
        }
        if (exception &&
            exception['response'] &&
            exception['response'].hasOwnProperty('name') &&
            exception['response'].name === 'MongoError') {
            status = common_1.HttpStatus.NOT_ACCEPTABLE;
            message = 'Record already exist';
        }
        if ((exception &&
            exception['response'] &&
            exception['response'].hasOwnProperty('kind') &&
            exception['response'].kind === 'ObjectId') ||
            (exception.hasOwnProperty('kind') && exception['kind'] === 'ObjectId')) {
            status = common_1.HttpStatus.BAD_REQUEST;
            message = 'Invalid mongo id';
        }
        const errorResponse = {
            code: status,
            timestamp: new Date().toLocaleDateString(),
            path: request.url,
            method: request.method,
            message: message,
        };
        if (status === common_1.HttpStatus.INTERNAL_SERVER_ERROR) {
            common_1.Logger.error(`${request.method} ${request.url}`, exception.stack, 'ExceptionFilter');
        }
        else {
            common_1.Logger.error(`${request.method} ${request.url}`, JSON.stringify(errorResponse), 'ExceptionFilter');
        }
        const error = {
            status: 'ERROR',
            data: '',
            message: errorResponse.message || '',
        };
        response.status(status).json(error);
    }
};
exports.HttpErrorFilter = HttpErrorFilter;
exports.HttpErrorFilter = HttpErrorFilter = __decorate([
    (0, common_1.Catch)()
], HttpErrorFilter);
//# sourceMappingURL=http-error.filter.js.map