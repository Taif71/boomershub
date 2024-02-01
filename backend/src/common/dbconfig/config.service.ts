import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv').config();
class ConfigService {
    constructor(private env: { [k: string]: string | undefined }) { }

    private getValue(key: string, throwOnMissing = true): string {
        const value = this.env[key];
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`);
        }

        return value;
    }

    public ensureValues(keys: string[]) {
        keys.forEach(k => this.getValue(k, true));
        return this;
    }

    public getPort() {
        return this.getValue('PORT', true);
    }

    public isProduction() {
        const mode = this.getValue('NODE_ENV', false);
        return mode === 'production';
    }

    public getTypeOrmConfig(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: this.getValue('MYSQL_DB_HOST'),
            port: parseInt(this.getValue('MYSQL_DB_PORT')),
            username: this.getValue('MYSQL_DB_USERNAME'),
            password: this.getValue('MYSQL_ROOT_PASSWORD'),
            database: this.getValue('MYSQL_DATABASE'),
            synchronize: true,
            logging: false,
            entities:
                process.env.NODE_ENV === 'development'
                    ? ['**/*.entity{.ts,.js}']
                    : ['dist/**/*.entity.js'],
            migrationsTableName: 'migration',
            migrations: ['src/migration/*.ts'],
            ssl: false,
        };
    }
}

const configService = new ConfigService(process.env).ensureValues([
    'MYSQL_DB_HOST',
    'MYSQL_DB_PORT',
    'MYSQL_DB_USERNAME',
    'MYSQL_ROOT_PASSWORD',
    'MYSQL_DATABASE',
]);

export { configService };
