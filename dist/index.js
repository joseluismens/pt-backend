"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./config/db");
const body_parser_1 = __importDefault(require("body-parser"));
const app_1 = __importDefault(require("./app"));
app_1.default.use(body_parser_1.default.json({ limit: '50mb' }));
const PORT = process.env.PORT || 3007;
function main() {
    db_1.conection.sync().then(() => {
        console.log("Conectado a la Base de Datos");
    }).catch((error) => {
        console.log("¡Error en la conexión!", error);
        throw error;
    });
    app_1.default.listen(PORT, () => {
        console.log('Servidor sequelize inicializado en el puerto ' + PORT);
    });
}
main();
