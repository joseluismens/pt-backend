"use strict";
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
const https_1 = __importDefault(require("https"));
const Conversion_1 = require("../models/Conversion");
const Usuario_1 = require("../models/Usuario");
class ConversionController {
    static convertirFecha(fecha) {
        return __awaiter(this, void 0, void 0, function* () {
            const parts = fecha.split('-');
            // Crear un objeto Date con los componentes de fecha invertidos
            const date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
            // Obtener los componentes de fecha en formato dd, mm y yyyy
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            // Devolver la fecha formateada en el nuevo formato
            return `${day}-${month}-${year}`;
        });
    }
}
_a = ConversionController;
ConversionController.convertirUF = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor, fecha } = req.body;
    let date = yield _a.convertirFecha(fecha);
    try {
        https_1.default.get(`https://mindicador.cl/api/uf/${date}`, (resolve) => {
            resolve.setEncoding('utf-8');
            let data = '';
            resolve.on('data', (chunk) => {
                data += chunk;
            });
            resolve.on('end', () => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const indicator = JSON.parse(data); // JSON to JavaScript object
                    let uf = indicator.serie[0].valor;
                    let conversion = Math.ceil(uf * valor);
                    const create = yield Conversion_1.Conversion.create({
                        original_amount: valor,
                        date_conversion: fecha,
                        uf,
                        conversion_amount: conversion,
                        usuario_id: res.locals.id
                    });
                    if (create)
                        return res.status(200).json({ message: 'conversion realizada exiosamente', create });
                    return res.status(500).json({ result: 0, message: 'Hubo un problema al guardar la conversión!' });
                }
                catch (error) {
                    return res.status(500).json({ result: 0, message: 'Error en la solicitud HTTPS!' });
                }
            }));
        }).on('error', (err) => {
            return res.status(500).json({ result: 0, message: 'Error en la solicitud HTTPS!' });
        });
    }
    catch (error) {
        return res.status(500).json({ result: 0, message: 'Error en la solicitud HTTPS!' });
    }
});
ConversionController.historial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = [];
        const historales = yield Conversion_1.Conversion.findAll({ order: [['created_at', 'DESC']], include: [Usuario_1.Usuario] });
        if (historales) {
            data = historales;
        }
        return res.status(200).json({ data });
    }
    catch (error) {
        return res.status(500).json({ message: 'hubo un problema al procesar la solicitud' });
    }
});
ConversionController.conversiones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = res.locals;
    try {
        let data = [];
        const historales = yield Conversion_1.Conversion.findAll({ where: { usuario_id: id }, order: [['created_at', 'DESC']] });
        if (historales) {
            data = historales;
        }
        return res.status(200).json({ data });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'hubo un problema al procesar la solicitud' });
    }
});
exports.default = ConversionController;
