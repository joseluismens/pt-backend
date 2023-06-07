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
exports.Conversion = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Usuario_1 = require("./Usuario");
let Conversion = exports.Conversion = class Conversion extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    }),
    __metadata("design:type", Number)
], Conversion.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DOUBLE,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Conversion.prototype, "original_amount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Conversion.prototype, "date_conversion", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DOUBLE,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Conversion.prototype, "uf", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.FLOAT,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Conversion.prototype, "conversion_amount", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Usuario_1.Usuario),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Conversion.prototype, "usuario_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Usuario_1.Usuario),
    __metadata("design:type", Usuario_1.Usuario)
], Conversion.prototype, "usuario", void 0);
exports.Conversion = Conversion = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        createdAt: "created_at",
        updatedAt: false,
        tableName: "conversions",
    })
], Conversion);
