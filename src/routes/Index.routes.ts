import {Router} from "express"
import conversion from './Conversion.routes'
import auth from './Auth.routes'

const routes = Router();

routes.use("/api",conversion);
routes.use("/api",auth);

export default routes;