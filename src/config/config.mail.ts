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
const path_resetPass = config.MAIL.path_resetPass;
const empresa        = config.EMPRESA.nombre;
const rif_empresa    = config.EMPRESA.rif;
const dir_empresa    = config.EMPRESA.direccion;
// const url_backend    = config.URL.BACKEND;
const url_backend = 'https://fkt9b3xc-3000.use2.devtunnels.ms/';

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
      console.log("email", email, "config.MAIL.correo", config.MAIL.correo );
      
      await transporter.sendMail({
         from     : `JLRAMIREZ <${config.MAIL.correo}>`,
         to       : email,
         subject,
         text     : "Buenas tardes estimado usuario,",
         html,
         attachments: [
            {
               filename: 'logo_busskm.jpg', // Nombre del archivo adjunto
               path: `${url_backend}storage/imgs/logo_busskm.jpg`, // Ruta completa al archivo
               cid: 'imglogobuskm', // Identificador único para la imagen (se usará en el cuerpo del correo)
            },
         ],
      });
   } catch (error) {
      console.log(error);
      
      console.log('No fue posible enviar email , '+error)
   }
}

export const getTemplateHtml = (nombre: string, token: string, afiliado:number, accion:string, aleatorio:string, origen:string) => {
   var html = ""; var path_confirm ="";
   path_confirm =  config.MAIL.path_confirm;

   if(accion === "confirmar"){
      // html = `
      // <div id="email__content">
      //    <img src="cid:imglogobuskm" alt="logo busskm">
      //    <h2>Estimado usuario ${nombre}, usted es el afiliado nro: ${afiliado}</h2>
      //    <p>Para confirmar su cuenta ingresa al siguiente enlace</p>         
      //    <p>Recuerde cambiar su contraseña en el próximo inicio de sesión.</p>
      //    <p>Gracias por confiar en nosotros.</p>
      //    <a href="${path_confirm}?token=${token}">Confirmar cuenta</a>
      //    </br>
      //    </br>
      //    <img src="cid:imglogobuskm" alt="logo busskm">
      // </div>
      // `
      html = `
      <div id="email__content" style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; text-align: center;">
    <!-- Encabezado -->
    <div style="background-color: #fff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); padding: 30px; margin: 20px auto; max-width: 600px;">
        <img src="cid:imglogobuskm" alt="logo busskm" style="max-width: 150px; margin-bottom: 20px;">

        <!-- Título -->
        <h2 style="color: #333;">¡Hola, ${nombre}!</h2>
        <p style="color: #555;">Usted es el afiliado número <strong>${afiliado}</strong>.</p>
        
        <!-- Mensaje principal -->
        <p style="color: #777; font-size: 16px; line-height: 1.6;">Para confirmar su cuenta, por favor haga clic en el siguiente botón. Recuerde cambiar su contraseña en el próximo inicio de sesión.</p>
        
        <!-- Botón de Confirmación -->
        <a href="${path_confirm}?token=${token}" 
           style="background-color: #d8318b; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; margin-top: 20px;">
           Confirmar cuenta
        </a>
        
        <!-- Texto de agradecimiento -->
        <p style="color: #555; margin-top: 30px;">Gracias por confiar en nosotros.</p>
    </div>
    
    <!-- Pie de página -->
    <div style="color: #999; font-size: 12px; margin-top: 20px;">
        <p>Si no solicitó este correo, por favor ignórelo.</p>
        <p>© ${new Date().getFullYear()} ${empresa}. Todos los derechos reservados.</p>
    </div>
</div>

      `      
   }
   if(accion == "validar"){
      html =  `
         <div id="email__content" style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; text-align: center;">
            <div style="background-color: #fff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); padding: 30px; margin: 20px auto; max-width: 600px;">
               <img src="cid:imglogobuskm" alt="logo busskm" style="max-width: 150px; margin-bottom: 20px;">

               <!-- Título -->
               <h2 style="color: #333;">¡Hola, ${nombre}!</h2>
               <p style="color: #555;">Usted ha tenido <strong>3 intentos fallidos</strong> al tratar de iniciar sesión.</p>
               
               <!-- Mensaje principal -->
               <p style="color: #777; font-size: 16px; line-height: 1.6;">Si olvidó su contraseña, por favor siga las instrucciones para restablecerla y volver a iniciar sesión.</p>
               
               <!-- Botón de Validación -->
               <a href="${path_validate}?token=${token}" 
                  style="background-color: #d8318b; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; margin-top: 20px;">
                  Validar cuenta
               </a>
               
               <!-- Texto de agradecimiento -->
               <p style="color: #555; margin-top: 30px;">Gracias por confiar en nosotros.</p>
            </div>
            
            <!-- Pie de página -->
            <div style="color: #999; font-size: 12px; margin-top: 20px;">
               <p>Si no solicitaste este correo, por favor ignóralo.</p>
               <p>© ${new Date().getFullYear()} ${empresa}. Todos los derechos reservados.</p>
            </div>
         </div>

      `
   }  
   if(accion == "aprobar"){
      html =  `
         <div id="email__content" style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; text-align: center;">
            <div style="background-color: #fff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); padding: 30px; margin: 20px auto; max-width: 600px;">
               <img src="cid:imglogobuskm" alt="logo busskm" style="max-width: 150px; margin-bottom: 20px;">

               <!-- Título -->
               <h2 style="color: #333;">Estimados señores de ${empresa}</h2>
               <p style="color: #555;">Le informamos que tienen pendiente la aprobación del usuario <strong>${nombre}</strong>.</p>
               
               <!-- Mensaje principal -->
               <p style="color: #777; font-size: 16px; line-height: 1.6;">Al aprobar el registro, se enviará una notificación al usuario informándole que su cuenta ha sido aprobada.</p>
               
               <!-- Botón de Aprobación -->
               <a href="${path_login}" 
                  style="background-color: #d8318b; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; margin-top: 20px;">
                  Aprobar cuenta
               </a>
               
               <!-- Texto de agradecimiento -->
               <p style="color: #555; margin-top: 30px;">Por favor, inicie sesión, verifique la información y apruebe el registro.</p>
            </div>
            
            <!-- Pie de página -->
            <div style="color: #999; font-size: 12px; margin-top: 20px;">
               <p>Si tiene preguntas, no dude en contactarnos.</p>
               <p>© ${new Date().getFullYear()} ${empresa}. Todos los derechos reservados.</p>
            </div>
         </div>

      `
   }
   
   if (accion == "resetpassword"){
      html = `
<div id="email__content" style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; text-align: center;">
    <div style="background-color: #fff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); padding: 30px; margin: 20px auto; max-width: 600px;">
        <img src="cid:imglogobuskm" alt="logo busskm" style="max-width: 150px; margin-bottom: 20px;">

        <!-- Título -->
        <h2 style="color: #333;">Solicitud de restablecimiento de contraseña</h2>
        <p style="color: #555;">Ha recibido este correo porque usted (u otra persona) solicitó el restablecimiento de la contraseña de la cuenta del usuario <strong>${nombre}</strong>.</p>
        
        <!-- Mensaje principal -->
        <p style="color: #777; font-size: 16px; line-height: 1.6;">Si no solicitaste este cambio, puedes ignorar este correo y tu contraseña permanecerá sin cambios.</p>
        <p style="color: #777; font-size: 16px; line-height: 1.6;">Para restablecer tu contraseña, haz clic en el siguiente enlace:</p>
        
        <!-- Botón de Restablecer Contraseña -->
        <a href="${path_resetPass}?token=${token}" 
           style="background-color: #d8318b; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; margin-top: 20px;">
           Cambiar clave
        </a>
        
        <!-- Texto de agradecimiento -->
        <p style="color: #555; margin-top: 30px;">Gracias por confiar en nosotros.</p>
    </div>
    
    <!-- Pie de página -->
    <div style="color: #999; font-size: 12px; margin-top: 20px;">
        <p>© ${new Date().getFullYear()} ${empresa}. Todos los derechos reservados.</p>
    </div>
</div>

      `
   }

   return html;     
}