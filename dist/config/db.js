"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.conection = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const sequelize_typescript_1 = require("sequelize-typescript");
const Usuario_1 = require("../models/Usuario");
const Conversion_1 = require("../models/Conversion");
exports.conection = new sequelize_typescript_1.Sequelize({
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    dialect: 'mysql',
    port: parseInt((_a = process.env.DB_PORT) !== null && _a !== void 0 ? _a : '3306'),
    password: process.env.DB_PASSWORD,
    dialectOptions: {},
    models: [Usuario_1.Usuario, Conversion_1.Conversion],
    //Evita mostrar mensaje en consola
    logging: true
});
