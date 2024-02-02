"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_service_1 = require("./common/dbconfig/config.service");
const users_module_1 = require("./users/users.module");
const files_module_1 = require("./files/files.module");
const folders_module_1 = require("./folders/folders.module");
const auth_module_1 = require("./auth/auth.module");
const core_1 = require("@nestjs/core");
const filters_1 = require("./common/filters");
const interceptor_1 = require("./common/interceptor");
const replace_authorization_header_middleware_1 = require("./common/middleware/replace-authorization-header.middleware");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(replace_authorization_header_middleware_1.ReplaceAuthorizationHeaderFromCookie).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(config_service_1.configService.getTypeOrmConfig()),
            files_module_1.FilesModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            folders_module_1.FoldersModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_FILTER,
                useClass: filters_1.HttpErrorFilter,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: interceptor_1.LoggingInterceptor,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: interceptor_1.TransformInterceptor,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map