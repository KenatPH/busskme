/*
  Empresa         : Bioonix
  Aplicación      : Api de BPRanking
  Módulo          : Archivo para iniciar la aplicación
  Fecha creación  : 22 de Mar del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de BPRanking
*/

import app from './app'
import './database'


app.listen(app.get('port'))
console.log(`Server Api-Busskm is running in port: ${app.get('port')}`)

