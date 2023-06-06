import { Router } from "express";
import UsuarioController from '../controllers/Usuario.controller'

const router =  Router();

router.post('/register', UsuarioController.register); //Crear una especialidad
router.post('/login', UsuarioController.login)

export default router;
