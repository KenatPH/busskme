import swaggerJSDoc from "swagger-jsdoc";
import path from 'path';;
import 'dotenv';
console.log('puerto: ',process.env.PORT);

//ruta documentación de la api
// Swagger configuration options
const options: swaggerJSDoc.Options = {
    definition: {
       openapi: '3.0.0',
       info: {
          title: 'API de Busskm',
          version: '1.0.0',
          description: 'API documentation for Busskm project - Created by Bioonix',
       },
       contact: {
          name: 'Bioonix',
          url: 'https://bioonix.com/',
       },
       servers: [
          {
             url: 'http://localhost:'+ process.env.PORT, // Replace with your server URL
          },
       ],            
    },
    apis:["src/routes/pais.routes.ts"]  
    //apis: [`${path.join(__dirname,'./routes/*' )}`],
    // security: [{ bearerAuth: [] }]
    
 };
 
 
 const swaggerSpec = swaggerJSDoc(options);

 export default swaggerSpec;