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
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const entities_1 = require("../../common/entities");
const folder_entity_1 = require("../../folders/entities/folder.entity");
let File = class File extends entities_1.BaseEntity {
};
exports.File = File;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200 }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], File.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => folder_entity_1.Folder, folder => folder.files),
    __metadata("design:type", folder_entity_1.Folder)
], File.prototype, "folder", void 0);
exports.File = File = __decorate([
    (0, typeorm_1.Entity)({ name: 'file' })
], File);
//# sourceMappingURL=files.entity.js.map