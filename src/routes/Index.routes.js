"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Conversion_routes_1 = __importDefault(require("./Conversion.routes"));
const Auth_routes_1 = __importDefault(require("./Auth.routes"));
const routes = (0, express_1.Router)();
routes.use("/api", Conversion_routes_1.default);
routes.use("/api", Auth_routes_1.default);
exports.default = routes;
