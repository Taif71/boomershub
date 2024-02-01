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
exports.Folder = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const entities_1 = require("../../common/entities");
const user_entity_1 = require("../../users/entities/user.entity");
let Folder = class Folder extends entities_1.BaseEntity {
};
exports.Folder = Folder;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200 }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Folder.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Folder, folder => folder.children, { nullable: true }),
    __metadata("design:type", Folder)
], Folder.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Folder, folder => folder.parent),
    __metadata("design:type", Array)
], Folder.prototype, "children", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.id),
    __metadata("design:type", user_entity_1.User)
], Folder.prototype, "user", void 0);
exports.Folder = Folder = __decorate([
    (0, typeorm_1.Entity)({ name: 'folder' })
], Folder);
//# sourceMappingURL=folder.entity.js.map