"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Conversion_controller_1 = __importDefault(require("../controllers/Conversion.controller"));
const checkJwt_1 = require("../middlewares/checkJwt");
const router = (0, express_1.Router)();
router.post('/conversion', (0, checkJwt_1.checkToken)(['user', 'admin'], false), Conversion_controller_1.default.convertirUF); //Crear una especialidad
router.get('/mis-conversiones', (0, checkJwt_1.checkToken)(['user', 'admin'], false), Conversion_controller_1.default.conversiones); //Crear una especialidad
router.get('/historial', Conversion_controller_1.default.historial); //Crear una especialidad
exports.default = router;
