import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import jwt_decode from 'jwt-decode';
import { SECRETKEY } from "../config/constantes";



export const checkTokenPassword = (req: Request, res: Response, next: NextFunction) => {
  try{
    /* Obtener el token password y asignarlo a la variable token*/
    let token = String( req.headers?.token).split(' ')[1];
    let ct = _checkToken(req, res, token, [], false) //Por defecto se envia un false
    if(ct !== true) return ct;
  }catch(err){
    return res.status(500).send({
      success: false,
      message: 'Ocurrió un error al obtener/validar la sesión',
      token_error_code: 'TOKEN_ERR'
    });
  }
  next();
}

export const checkToken = (rolesPermitidos: Array<any> = [], allowExpiredToken:boolean = false) => {
  
  return function( req: Request, res: Response, next: NextFunction){
    try{
        
    let token = req.headers?.authorization?.split(' ')[1];
      let ct = _checkToken(req, res, token, rolesPermitidos, allowExpiredToken)
      if(ct !== true) return ct;
    }catch(err){
      return res.status(500).send({
        success: false,
        message: 'Ocurrió un error al obtener/validar la sesión',
        token_error_code: 'TOKEN_ERR'
      });
    }
    next();
  }
  
}

function _checkToken(req: Request, res: Response, token:any, rolesPermitidos:Array<any>, allowExpiredToken:boolean = false) {
  let tokenError = '';
  let payload:any;
    
  //Bearer [jwt............................]
  if (token === 'null' || token === null || token === undefined || token === "") {
    return res.status(401).send({
      success: false,
      message: 'Token no encontrado',
      token_error_code: 'TOKEN_NOT_FOUND'
    });
  
  }
  jwt.verify(token, SECRETKEY, function (err:any, decoded:any) {
    if (err) {
   
      tokenError = err.message;
    } else {
      payload = decoded;
      
      res.locals.jwtPayload = decoded
      res.locals.id = payload.id_usuario;
      res.locals.rol = payload.rol;
     
    }
  });

  if (tokenError !== '') {
    if (tokenError === 'jwt expired') {
      if(allowExpiredToken === true){
        
        let expiracion:any = jwt_decode(token);
        if((expiracion.exp+24*3600) < (Date.now()/1000)){
          return res.status(401).send({
            success: false,
            message: 'Token expirado (extendido)',
            token_error_code: 'TOKEN_EXPIRED'
          });
        }

      }else{
        return res.status(401).send({
          success: false,
          message: 'Token expirado',
          token_error_code: 'TOKEN_EXPIRED'
        });
      }
      
    } else {
      return res.status(401).send({
        success: false,
        message: 'Token Error: ' + tokenError,
        token_error_code: 'TOKEN_ERR'
      });
    } 
  }else if (payload === '') {
    return res.status(401).send({
      success: false,
      message: 'Token inválido',
      token_error_code: 'TOKEN_INVALID'
    });
  } else {
     
        let encontrado = false;        
        
        let role = rolesPermitidos.filter((el:any)=>el == payload.rol);
        if (role.length > 0) {
            encontrado=true;
            
        }
      
        
        

        
        if(!encontrado){
          return res.status(403).send({
            success: false,
            message: 'No autorizado',
            token_error_code: 'TOKEN_ERR'
          });
        }
        return true;

    
      
  }
}

