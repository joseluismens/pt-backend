
import * as dotenv from 'dotenv' 
dotenv.config()

import { Sequelize } from 'sequelize-typescript';
import { Usuario } from '../models/Usuario';
import { Conversion } from '../models/Conversion';



export const conection = new Sequelize({
    host:process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    database:process.env.DB_DATABASE,
    dialect: 'mysql',
    port: parseInt(process.env.DB_PORT??'3306'),
    password: process.env.DB_PASSWORD,
    dialectOptions: {
     
    },
    models:[Usuario,Conversion],

    
    //Evita mostrar mensaje en consola
    logging:true
  });