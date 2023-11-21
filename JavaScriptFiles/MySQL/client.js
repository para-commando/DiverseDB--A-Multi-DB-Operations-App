"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const typeorm_1 = require("typeorm");
let client = exports.client = class client extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    })
], client.prototype, "first_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' })
], client.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
        default: 'default@default.default',
    })
], client.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
        length: 10,
        default: 'asdfghjkla',
    })
], client.prototype, "card_number", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'double precision',
        default: 0,
    })
], client.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        name: 'active'
    })
], client.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'simple-json',
        nullable: true,
        default: {
            age: -1,
            hair_color: 'none',
        },
    })
], client.prototype, "additional_info", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'simple-array',
        default: [''],
    })
], client.prototype, "family_members", void 0);
exports.client = client = __decorate([
    (0, typeorm_1.Entity)('client') // 'users' is the table name
], client);
//# sourceMappingURL=client.js.map