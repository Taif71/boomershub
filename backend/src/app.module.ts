import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './common/dbconfig/config.service';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { FoldersModule } from './folders/folders.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorFilter } from './common/filters';
import { LoggingInterceptor, TransformInterceptor } from './common/interceptor';
import { ReplaceAuthorizationHeaderFromCookie } from './common/middleware/replace-authorization-header.middleware';
import { UsersService } from './users/users.service';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    FilesModule,
    UsersModule,
    AuthModule,
    FoldersModule,
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    UsersService
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ReplaceAuthorizationHeaderFromCookie).forRoutes('*')
  }
}