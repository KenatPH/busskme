
// import mongoose  from "mongoose";
// import config from "./config/config";

// var db_uri="";
// if(!config.RUN_MODE){
//    db_uri = "mongodb://busskm:FdXspPNirP4Q7M8Pr6tIuunHSvmXn1712%23adhH6zsZn5d3xenEqqN9ZQv0409@206.189.198.108:27017/bdbusskm?tls=false&authMechanism=DEFAULT"
//    // db_uri = "mongodb+srv://krtabares:e7PPfzmdPxOTprsI@mongotest.ub8zvum.mongodb.net/"
//    // db_uri = "mongodb://127.0.0.1:27017/busskm"
//    // if(config.DB.URI !== undefined){
//    //    db_uri = config.DB.URI;
//    // }
// }else{
//    if(config.DB.URI !== undefined){
//       db_uri = config.DB.URI;
//    }
// }

// export const connectDB = async () => {   
//    try {
//       console.log(db_uri);
      
//       await mongoose.connect(db_uri)
//       console.log('Mongodb connection stablished');
//       const connection = mongoose.connection;

//       connection.on('error', (error) => {
//          console.error('Error de conexión con bd mongodb:', error);
//          process.exit(0);
//       });
       
//       connection.once('open', () => {
//          console.log('Mongodb connection stablished');
//       })
      
//    } catch (error) {
//       console.log('Error in connection db ',error);
//       process.exit(0);    
//    }
// }

import mongoose from "mongoose";
import config from "./config/config";

// URI de conexión desde configuración o variable de entorno
const db_uri = config.DB.URI || process.env.MONGO_URI;

if (!db_uri) {
  console.error("No se ha proporcionado una URI válida para la conexión a MongoDB.");
  process.exit(1);
}

export const connectDB = async () => {   
  try {
    // Intento de conexión con configuración de pool
    await mongoose.connect(db_uri, {
      maxPoolSize: 10,      // Tamaño máximo de conexiones en el pool
      minPoolSize: 5,       // Tamaño mínimo de conexiones en el pool
      socketTimeoutMS: 45000,  // Tiempo de espera de inactividad
      serverSelectionTimeoutMS: 5000 // Tiempo para intentar conectarse a un servidor antes de fallar
    });
    
    console.log("Conexión a MongoDB establecida correctamente.");

    const connection = mongoose.connection;

    connection.on("error", (error) => {
      console.error("Error de conexión con MongoDB:", error);
      process.exit(1);
    });
    
    connection.once("open", () => {
      console.log("MongoDB está conectado.");
    });

    // Cerrar conexión al salir del proceso
    process.on("SIGINT", gracefulShutdown); // Interrupción del proceso (Ctrl+C)
    process.on("SIGTERM", gracefulShutdown); // Terminación del proceso (en servidores)
    process.on("exit", gracefulShutdown); // Cierre del proceso en general

  } catch (error) {
    console.error("Error en la conexión a MongoDB:", error);
    process.exit(1);
  }
};

// Función para cerrar la conexión de forma controlada
const gracefulShutdown = async () => {
  try {
    await mongoose.connection.close();
    console.log("Conexión a MongoDB cerrada correctamente.");
    process.exit(0); // Salida exitosa del proceso
  } catch (error) {
    console.error("Error al cerrar la conexión de MongoDB:", error);
    process.exit(1); // Salida con error
  }
};
