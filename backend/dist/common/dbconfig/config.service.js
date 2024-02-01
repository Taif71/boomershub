"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configService = void 0;
require('dotenv').config();
class ConfigService {
    constructor(env) {
        this.env = env;
    }
    getValue(key, throwOnMissing = true) {
        const value = this.env[key];
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`);
        }
        return value;
    }
    ensureValues(keys) {
        keys.forEach(k => this.getValue(k, true));
        return this;
    }
    getPort() {
        return this.getValue('PORT', true);
    }
    isProduction() {
        const mode = this.getValue('NODE_ENV', false);
        return mode === 'production';
    }
    getTypeOrmConfig() {
        return {
            type: 'mysql',
            host: this.getValue('MYSQL_DB_HOST'),
            port: parseInt(this.getValue('MYSQL_DB_PORT')),
            username: this.getValue('MYSQL_DB_USERNAME'),
            password: this.getValue('MYSQL_ROOT_PASSWORD'),
            database: this.getValue('MYSQL_DATABASE'),
            synchronize: true,
            logging: false,
            entities: process.env.NODE_ENV === 'development'
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
exports.configService = configService;
//# sourceMappingURL=config.service.js.map