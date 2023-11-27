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
exports.ClientPhotos = void 0;
const typeorm_1 = require("typeorm");
const clientsEntity_1 = require("./clientsEntity");
let ClientPhotos = exports.ClientPhotos = class ClientPhotos {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ClientPhotos.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ClientPhotos.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ClientPhotos.prototype, "clientID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => clientsEntity_1.Clients, (clients) => clients.photos),
    (0, typeorm_1.JoinColumn)({ name: 'clientID' }) // Specify your custom foreign key column name
    ,
    __metadata("design:type", clientsEntity_1.Clients)
], ClientPhotos.prototype, "client", void 0);
exports.ClientPhotos = ClientPhotos = __decorate([
    (0, typeorm_1.Entity)()
], ClientPhotos);
//# sourceMappingURL=clientsPhotoEntity.js.map