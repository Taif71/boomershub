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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async validate(loginDto) {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    email: loginDto.email,
                },
            });
            if (!user) {
                throw new common_1.NotFoundException(`User ${loginDto.email} not found`);
            }
            return user;
        }
        catch (error) {
            return;
        }
    }
    async login(loginDto) {
        return this.validate(loginDto).then(userData => {
            if (!userData) {
                throw new common_1.NotFoundException('User Not Found');
            }
            if (userData.isDeleted) {
                throw new common_1.ForbiddenException('User is deleted');
            }
            if (!userData.isActive) {
                throw new common_1.ForbiddenException('User acount is on hold');
            }
            const passwordIsValid = bcrypt.compareSync(loginDto.password, userData.password);
            if (!passwordIsValid == true) {
                throw new common_1.UnauthorizedException('Unauthorized access: Wrong password');
            }
            const payload = {
                id: userData.id,
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
            };
            const accessToken = this.jwtService.sign(payload);
            return {
                expiresIn: 7 * 24 * 60 * 60 * 1000,
                token: accessToken,
                user: payload,
                status: common_1.HttpStatus.OK,
            };
        });
    }
    async validateUserByJwt(payload) {
        const user = await this.userRepository.findOne({
            where: {
                email: payload.email,
            },
        });
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        return this.createJwtPayload(user);
    }
    createJwtPayload(user) {
        const data = {
            email: user.email,
        };
        const jwt = this.jwtService.sign(data);
        return {
            expiresIn: 7 * 24 * 60 * 60 * 1000,
            token: jwt,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map