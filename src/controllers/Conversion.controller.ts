import { Request, Response } from "express";

import https from 'https';
import { Conversion } from "../models/Conversion";
import { Usuario } from "../models/Usuario";

export default class ConversionController {



    static convertirUF = async (req: Request, res: Response) => {

        const {valor, fecha } = req.body;
            let date = await this.convertirFecha(fecha);
            try {
                https.get(`https://mindicador.cl/api/uf/${date}`, (resolve:any ) => {
                    resolve.setEncoding('utf-8');
                    let data = '';

                    resolve.on('data', (chunk: string) => {
                        data += chunk;
                    });

                    resolve.on('end', async () => {
                        try {
                            const indicator = JSON.parse(data); // JSON to JavaScript object

                            let uf = indicator.serie[0].valor;
                            let conversion =  Math.ceil(uf * valor);

                           const create = await  Conversion.create({
                                original_amount:valor,
                                date_conversion: fecha,
                                uf,
                                conversion_amount:conversion,
                                usuario_id:res.locals.id


                            });

                            if (create) 
                                return res.status(200).json({message:'conversion realizada exiosamente',create})
                                
                             return res.status(500).json({result:0,message:'Hubo un problema al guardar la conversión!'})

                
                            
                        } catch (error) {
                            return res.status(500).json({result:0,message:'Error en la solicitud HTTPS!'})

                        }
                    });
                }).on('error', (err: Error) => {
                    return res.status(500).json({result:0,message:'Error en la solicitud HTTPS!'})

                
                });
            } catch (error) {
                return res.status(500).json({result:0,message:'Error en la solicitud HTTPS!'})
            }


    }


    static historial = async (req:Request, res:Response)=>{

        try {
            let data:any = [];
            const historales = await Conversion.findAll({ order:[['created_at','DESC']]  ,include:[Usuario]});
            if (historales){
                data = historales;
            }
            return res.status(200).json({data});
        } catch (error) {
            return res.status(500).json({message:'hubo un problema al procesar la solicitud'})

        }
    }

    static conversiones = async (req:Request, res:Response)=>{
        const {id} =  res.locals;
        
        try {
            let data:any = [];
            const historales = await Conversion.findAll({where:{usuario_id:id},order:[['created_at','DESC']]});
            if (historales){
                data = historales;
            }
            return res.status(200).json({data});
        } catch (error) {
            console.log(error);
            
            return res.status(500).json({message:'hubo un problema al procesar la solicitud'})
        }
    }


    static async convertirFecha(fecha:string){
        const parts = fecha.split('-');
  
        // Crear un objeto Date con los componentes de fecha invertidos
        const date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
        
        // Obtener los componentes de fecha en formato dd, mm y yyyy
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        
        // Devolver la fecha formateada en el nuevo formato
        return `${day}-${month}-${year}`;
      
    }

    

}