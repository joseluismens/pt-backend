import { Router } from "express";
import ConversionController from "../controllers/Conversion.controller";
import { checkToken } from "../middlewares/checkJwt";

const router =  Router();

router.post('/conversion', checkToken(['user','admin'],false), ConversionController.convertirUF,); //Crear una especialidad
router.get('/mis-conversiones',checkToken(['user','admin'],false), ConversionController.conversiones); //Crear una especialidad
router.get('/historial', ConversionController.historial,); //Crear una especialidad


export default router;
