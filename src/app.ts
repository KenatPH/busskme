/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm 
  Módulo          : Archivo que define la configuración para la conexión a la BD
  Fecha creación  : 23 de Mar del 2024
  Modificado el   : 15-04-24
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import express, { urlencoded } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from './config/config';
import { connectDB } from './database';
import passport, { Passport } from 'passport';
import passportMiddleware from './middlewares/protectedroutes.middleware';
import {checkAuth} from './config/config.jwt';
import session from 'express-session';
import initialConfig from './config/initialConfig';
import path from 'path';

//imported routes
import authRoutes from './routes/auth.routes'
import authConfirmRoutes from './routes/auth.routes'
import protectedRoutes from './routes/protected.routes'
import userRoutes from './routes/users.routes'
import userAuthRegisterRoutes from './routes/users.routes'
import paisRoutes from './routes/pais.routes'
import edoRoutes from './routes/estados.routes'
import ciudadRoutes from './routes/ciudad.routes'
import categoriaRoutes from './routes/educacion.routes'
import rutaRoutes from './routes/ruta.routes'
import paradaRoutes from './routes/parada.routes'
import vehiculoRoutes from './routes/vehiculo.routes'
import marcaRoutes from './routes/marca.routes'
import modeloRoutes from './routes/modelo.routes'
import roleRoutes from './routes/role.routes'
import choferRoutes from './routes/chofer.routes'
import educacionRoutes from './routes/educacion.routes'
import colorRoutes from './routes/color.routes'
import organizacionRoutes from './routes/organizacion.routes'



//import fbkRoutes from './routes/fbk.routes'

//conexión a la bd
connectDB();

//initializations
const app = express()

// settings
app.set('port', process.env.PORT || 3000)

//crear directorio storage si no existe
initialConfig.cerateDirStorage();

//crear Roles y usuario superadmin;
initialConfig.createRolesAndUser();

//middlewares
app.use(morgan('dev'))
const corsOptions = {
   origin: 'https://rhnrkzk3-3000.use2.devtunnels.ms/', // Cambia esto al dominio correcto de tu cliente
   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
   credentials: true, // Si estás manejando cookies o autenticación
 };
app.use(cors());
app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Methods', '*')
   res.setHeader('Access-Control-Allow-Headers', '*')
   next()
});

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(session({ secret: config.FBK.secretSession, resave: true, saveUninitialized: true }));
app.use(passport.initialize())
app.use(passport.session());
passport.use(passportMiddleware)

//routes
app.get('/', (req, res) => {
   res.send(`The API Busskm, is running in http://localhost:${app.get('port')}`)
})

//rutas de autenticación sin validacion de autenticate
app.use('/auth',authRoutes);

app.use('/auth/account/',passport.authenticate('jwt', {session: false}),authConfirmRoutes);

//ruta para registrar usuario cliente desde la app o web, sin authenticate
app.use('/user/auth',userAuthRegisterRoutes);
app.use('/user',userRoutes);
//app.use('/user',userRoutes);

//app.use('/admin',checkAuth,passport.authenticate('jwt', {session: false}),adminRoutes);
app.use('/pais',checkAuth,passport.authenticate('jwt', {session: false}),paisRoutes);
app.use('/estado',passport.authenticate('jwt', {session: false}),edoRoutes);
app.use('/ciudad',passport.authenticate('jwt', {session: false}),ciudadRoutes);
//app.use('/municipio',municipioRoutes);
app.use('/category',passport.authenticate('jwt', {session: false}),categoriaRoutes);
app.use('/ruta',rutaRoutes);
app.use('/chofer',choferRoutes);
app.use('/organizador',organizacionRoutes);
app.use('/educacion',educacionRoutes);
app.use('/parada',paradaRoutes);
app.use('/vehiculo',vehiculoRoutes);
app.use('/vehiculo/marca',marcaRoutes);
app.use('/vehiculo/modelo',modeloRoutes);
app.use('/vehiculo/color',colorRoutes);
app.use('/roles',passport.authenticate('jwt', {session: false}),roleRoutes);
app.use('/storage',express.static(path.resolve(config.STORAGEAPI.destination)));
app.use(passport.authenticate('jwt', {session: false}),protectedRoutes);
//app.use('/login/facebook',fbkRoutes);
export default app