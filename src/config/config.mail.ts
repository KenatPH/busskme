/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo que define la configuración para el envío de correos
  Fecha creación  : 23 de Mar del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/


import nmailer from 'nodemailer';
import config from "./config";

const path_confirm = config.MAIL.path_confirm;
const path_validate  = config.MAIL.path_validate;
const path_login     = config.MAIL.path_login;
const empresa        = config.EMPRESA.nombre;
const rif_empresa    = config.EMPRESA.rif;
const dir_empresa    = config.EMPRESA.direccion;
const url_backend    = config.URL.BACKEND;

let transporter = nmailer.createTransport({
   host  : "smtp.gmail.com",
   port  : 465,
   secure: true, //true for port 465, false for other ports
   auth  : {
      user  : config.MAIL.correo,
      pass  : config.MAIL.passw
   }
});

export const sendMail = async (email: string, subject: string, html: string) => {
   try {
      await transporter.sendMail({
         from     : `JLRAMIREZ <${config.MAIL.correo}>`,
         to       : email,
         subject,
         text     : "Buenas tardes estimado usuario,",
         html,
      });
   } catch (error) {
      console.log('No fue posible enviar email de confirmación, '+error)
   }
}

export const getTemplateHtml = (nombre: string, token: string, afiliado:number, accion:string, aleatorio:string, origen:string) => {
   var html = ""; var path_confirm ="";
   path_confirm = origen === "admin" ? config.MAIL.path_confirm_admin : config.MAIL.path_confirm;

   if(accion === "confirmar"){
      html = `
      <div id="email__content">
         <img src="${url_backend}storage/imgs/logo_busskm.svg" alt="logo busskm">
         <h2>Estimado usuario ${nombre}, usted es el afiliado nro: ${afiliado}</h2>
         <p>Para confirmar su cuenta ingresa al siguiente enlace</p>         
         <p>Recuerde cambiar su contraseña en el próximo inicio de sesión.</p>
         <p>Gracias por confiar en nosotros.</p>
         <a href="${path_confirm}?token=${token}">Confirmar cuenta</a>
         </br>
         </br>
         <img src="${url_backend}storage/imgs/logo_busskm.svg" alt="logo busskm">
      </div>
      `      
   }
   if(accion == "validar"){
      html =  `
         <div id="email__content">
            <img src="${url_backend}storage/imgs/logo_busskm.svg" alt="logo busskm">
            <h2>Estimado usuario ${nombre}, usted tuvo 3 intentos fallidos al tratar de iniciar sesión </h2>
            <p>Si se le olvidó su contraseña, por favor siga las instrucciones,</p>
            <p>para resetear su contraseña y vuelva a iniciar sesión.</p>
            <p>Para validar tu cuenta ingresa al siguiente enlace</p>            
            <a href="${path_validate}?token=${token}">Validar cuenta</a>
            </br>
            </br>
            <img src="${url_backend}storage/imgs/logo_busskm.svg" alt="logo busskm">
         </div>
      `
   }  
   if(accion == "aprobar"){
      html =  `
         <div id="email__content">
            <img src="${url_backend}storage/imgs/logo_busskm.svg" alt="logo busskm">
            <h2>Estimados señores ${empresa}, le informamos que tienen pendiente por aprobación,</h2>
            <h2>al usuario ${nombre}.</h2> 
            <p>Al momento de aprobar, se le enviará un correo al usuario</p>
            <p>notificándole que su registro ha sido aprobado por ustedes.</p>
            <p>Gracias, saludos cordiales.</p>
            <p>por favor inicie sesión, verifique la información y apruebe el registro.</p>
            <a href="${path_login}">Aprobar cuenta</a>
            </br>
            </br>
            <img src="${url_backend}storage/imgs/logo_busskm.svg" alt="logo busskm">
         </div>
      `
   } 

   return html;     
}