"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const fs = require("fs");
require("dotenv/config");
const PORT = process.env.PORT || 8080;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    common_1.Logger.log(`Origin customer_host:${process.env.FE_HOST}`, 'OriginHost');
    const options = {
        origin: [/^(.*)/, process.env.FE_HOST],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 200,
        credentials: true,
        allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization,authorization,X-Forwarded-for,traceparent,request-id,request-context,user-agent',
        exposedHeaders: 'X-DRIVE-KEY,X-DRIVE-KEY-EXPIRES',
    };
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Api')
        .setDescription('This api will help clients to store their data.')
        .setVersion('1.0')
        .addTag('Api')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));
    swagger_1.SwaggerModule.setup('swagger', app, document);
    app.use(cookieParser());
    app.use(compression({
        level: 6,
        filter: shouldCompress,
    }));
    app.enableCors(options);
    await app.listen(PORT);
    common_1.Logger.log(`Server running on http://localhost:${PORT}`, 'Bootstrap');
}
bootstrap();
function shouldCompress(req, res) {
    if (req.headers['x-no-compression'] &&
        req.headers['x-no-compression'] === 'true') {
        return false;
    }
    return compression.filter(req, res);
}
//# sourceMappingURL=main.js.map