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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const Usuario_1 = require("../models/Usuario");
const utils_1 = __importDefault(require("../config/utils"));
const jwt = __importStar(require("jsonwebtoken"));
const constantes_1 = require("../config/constantes");
class ConversionController {
}
_a = ConversionController;
ConversionController.register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { fullname, email, password } = req.body;
        console.log(req.body);
        if (!(email && password))
            return res.status(500).json({
                message: "No se han enviado las credenciales para el usuario",
            });
        const existe_usuario = yield Usuario_1.Usuario.findOne({ where: { email: email } });
        if (existe_usuario != null) {
            return res.status(500).json({
                message: "El correo ya ha sido registrado",
            });
        }
        const usuario = yield Usuario_1.Usuario.create({
            fullname,
            email,
            password
        });
        return res.status(200).json({ message: 'Usuario registrado' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json("Hubo un problema al realizar el registro, intente nuevamente más tarde");
    }
});
ConversionController.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(500).json({
                message: "No se han completado las credenciales de inicio de sesión",
            });
        }
        const usuario = yield Usuario_1.Usuario.findOne({ where: { email: email } });
        if (usuario) {
            if (!(0, utils_1.default)(password, usuario.password))
                return res.status(500).json({
                    message: "Credenciales incorrectas",
                });
            const token = jwt.sign({
                id_usuario: usuario.id,
                nombre_completo: usuario.fullname,
                email: usuario.email,
                rol: usuario.rol,
            }, constantes_1.SECRETKEY, { expiresIn: '1h' });
            return res.header('auth-token', token).json({
                id: usuario.id,
                nombre_completo: usuario.fullname,
                email: usuario.email,
                rol: usuario.rol,
                token: token
            });
        }
        return res.status(500).json({
            message: "Este usuario no esta registrado en nuestro sistema",
        });
    }
    catch (error) {
        return res.status(500).json("Hubo un problema al iniciar sesión");
    }
});
exports.default = ConversionController;
