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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = exports.checkTokenPassword = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const constantes_1 = require("../config/constantes");
const checkTokenPassword = (req, res, next) => {
    var _a;
    try {
        /* Obtener el token password y asignarlo a la variable token*/
        let token = String((_a = req.headers) === null || _a === void 0 ? void 0 : _a.token).split(' ')[1];
        let ct = _checkToken(req, res, token, [], false); //Por defecto se envia un false
        if (ct !== true)
            return ct;
    }
    catch (err) {
        return res.status(500).send({
            success: false,
            message: 'Ocurrió un error al obtener/validar la sesión',
            token_error_code: 'TOKEN_ERR'
        });
    }
    next();
};
exports.checkTokenPassword = checkTokenPassword;
const checkToken = (rolesPermitidos = [], allowExpiredToken = false) => {
    return function (req, res, next) {
        var _a, _b;
        try {
            let token = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
            let ct = _checkToken(req, res, token, rolesPermitidos, allowExpiredToken);
            if (ct !== true)
                return ct;
        }
        catch (err) {
            return res.status(500).send({
                success: false,
                message: 'Ocurrió un error al obtener/validar la sesión',
                token_error_code: 'TOKEN_ERR'
            });
        }
        next();
    };
};
exports.checkToken = checkToken;
function _checkToken(req, res, token, rolesPermitidos, allowExpiredToken = false) {
    let tokenError = '';
    let payload;
    //Bearer [jwt............................]
    if (token === 'null' || token === null || token === undefined || token === "") {
        return res.status(401).send({
            success: false,
            message: 'Token no encontrado',
            token_error_code: 'TOKEN_NOT_FOUND'
        });
    }
    jwt.verify(token, constantes_1.SECRETKEY, function (err, decoded) {
        if (err) {
            tokenError = err.message;
        }
        else {
            payload = decoded;
            res.locals.jwtPayload = decoded;
            res.locals.id = payload.id_usuario;
            res.locals.rol = payload.rol;
        }
    });
    if (tokenError !== '') {
        if (tokenError === 'jwt expired') {
            if (allowExpiredToken === true) {
                let expiracion = (0, jwt_decode_1.default)(token);
                if ((expiracion.exp + 24 * 3600) < (Date.now() / 1000)) {
                    return res.status(401).send({
                        success: false,
                        message: 'Token expirado (extendido)',
                        token_error_code: 'TOKEN_EXPIRED'
                    });
                }
            }
            else {
                return res.status(401).send({
                    success: false,
                    message: 'Token expirado',
                    token_error_code: 'TOKEN_EXPIRED'
                });
            }
        }
        else {
            return res.status(401).send({
                success: false,
                message: 'Token Error: ' + tokenError,
                token_error_code: 'TOKEN_ERR'
            });
        }
    }
    else if (payload === '') {
        return res.status(401).send({
            success: false,
            message: 'Token inválido',
            token_error_code: 'TOKEN_INVALID'
        });
    }
    else {
        let encontrado = false;
        let role = rolesPermitidos.filter((el) => el == payload.rol);
        if (role.length > 0) {
            encontrado = true;
        }
        if (!encontrado) {
            return res.status(403).send({
                success: false,
                message: 'No autorizado',
                token_error_code: 'TOKEN_ERR'
            });
        }
        return true;
    }
}
