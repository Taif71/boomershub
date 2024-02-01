"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NullValidationPipe_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullValidationPipe = void 0;
const common_1 = require("@nestjs/common");
let NullValidationPipe = NullValidationPipe_1 = class NullValidationPipe {
    static isObj(obj) {
        return typeof obj === 'object' && obj !== null;
    }
    dropNull(values) {
        Object.keys(values).forEach((key) => {
            if (!(key === 'password' || key === '_id')) {
                if (NullValidationPipe_1.isObj(values[key])) {
                    values[key] = this.dropNull(values[key]);
                }
                else if (Array.isArray(values[key]) && values[key].length > 0) {
                    values[key] = values[key].map((value) => {
                        if (NullValidationPipe_1.isObj(value)) {
                            value = this.dropNull(value);
                        }
                        return value;
                    });
                }
                else {
                    if (values[key] === null || values[key] === undefined) {
                        delete values[key];
                    }
                }
            }
        });
        return values;
    }
    transform(values, metadata) {
        try {
            const { type } = metadata;
            if (type === 'param' || type === 'custom')
                return values;
            else if (NullValidationPipe_1.isObj(values) && type === 'body') {
                return this.dropNull(values);
            }
        }
        catch (err) {
            throw new common_1.HttpException(err, err.status || common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.NullValidationPipe = NullValidationPipe;
exports.NullValidationPipe = NullValidationPipe = NullValidationPipe_1 = __decorate([
    (0, common_1.Injectable)()
], NullValidationPipe);
//# sourceMappingURL=null-validator.pipe.js.map