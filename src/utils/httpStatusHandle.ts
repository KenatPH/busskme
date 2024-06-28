/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo que define los códigos http estatus de la api
  Fecha creación  : 14 de May del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de bpr
*/

export const httpCode:any = {
   200: { code: 200, message: 'OK' },
   201: { code: 201, message: 'Created' },
   202: { code: 202, message: 'Accepted' },
   203: { code: 203, message: 'Non-Authoritative Information' },
   204: { code: 204, message: 'No Content' },
   205: { code: 205, message: 'Reset Content' },
   206: { code: 206, message: 'Partial Content' },
   207: { code: 207, message: 'Multi-Status' },
   208: { code: 208, message: 'Already Reported' },
   226: { code: 226, message: 'IM Used' },
   300: { code: 300, message: 'Multiple Choices' },
   301: { code: 301, message: 'Moved Permanently' },
   302: { code: 302, message: 'Found' },
   303: { code: 303, message: 'See Other' },
   304: { code: 304, message: 'Not Modified' },
   305: { code: 305, message: 'Use Proxy' },
   307: { code: 307, message: 'Temporary Redirect' },
   308: { code: 308, message: 'Permanent Redirect' },
   400: { code: 400, message: 'Bad Request' },
   401: { code: 401, message: 'Unauthorized' },
   402: { code: 402, message: 'Payment Required' },
   403: { code: 403, message: 'Forbidden' },
   404: { code: 404, message: 'Not Found' },
   405: { code: 405, message: 'Method Not Allowed' },
   406: { code: 406, message: 'Not Acceptable' },
   407: { code: 407, message: 'Proxy Authentication Required' },
   408: { code: 408, message: 'Request Timeout' },
   409: { code: 409, message: 'Conflict' },
   410: { code: 410, message: 'Gone' },
   411: { code: 411, message: 'Length Required' },
   412: { code: 412, message: 'Precondition Failed' },
   413: { code: 413, message: 'Payload Too Large' },
   414: { code: 414, message: 'URI Too Long' },
   415: { code: 415, message: 'Unsupported Media Type' },
   416: { code: 416, message: 'Range Not Satisfiable' },
   417: { code: 417, message: 'Expectation Failed' },
   418: { code: 418, message: "I'm a teapot" },
   421: { code: 421, message: 'Misdirected Request' },
   422: { code: 422, message: 'Unprocessable Entity' },
   423: { code: 423, message: 'Locked' },
   424: { code: 424, message: 'Failed Dependency' },
   425: { code: 425, message: 'Too Early' },
   426: { code: 426, message: 'Upgrade Required' },
   428: { code: 428, message: 'Precondition Required' },
   429: { code: 429, message: 'Too Many Requests' },
   431: { code: 431, message: 'Request Header Fields Too Large' },
   451: { code: 451, message: 'Unavailable For Legal Reasons' },
   500: { code: 500, message: 'Internal Server Error' },
   501: { code: 501, message: 'Not Implemented' },
   502: { code: 502, message: 'Bad Gateway' },
   503: { code: 503, message: 'Service Unavailable' },
   504: { code: 504, message: 'Gateway Timeout' },
   505: { code: 505, message: 'HTTP Version Not Supported' },
   506: { code: 506, message: 'Variant Also Negotiates' },
   507: { code: 507, message: 'Insufficient Storage' },
   508: { code: 508, message: 'Loop Detected' },
   510: { code: 510, message: 'Not Extended' },
   511: { code: 511, message: 'Network Authentication Required' },
   600: {code: 600, 
         es: 'Usuario creado exitosamente, se envió un correo electrónico para confirmar su cuenta, revise su carpeta de spam.',
         en: 'User created successfully, an email has been sent to confirm your account, check your spam folder.'
      },
   601:{code: 601, 
         es: 'La cuenta debe ser confirmada por el usuario, para poder iniciar sesión.',
         en: 'The account must be confirmed by the user, to be able to log in.'
   },
   602:{code: 602, 
      es: 'La clave no puede estar vacía.',
      en: 'The key cannot be empty.'
    },
   603:{code: 603,
      es: 'Datos encontrados con éxito.',
      en: 'Data found successfully.'
   }, 
   604:{code: 604,
      es: 'Datos no encontrados.',
      en: 'Data not found.'
   }, 
   605:{code: 605,
      es: 'Inicio de sesión exitoso.',
      en: 'Login successfully.'
   },
   606:{code: 606,
      es: 'Inicio de sesión exitoso.',
      en: 'Login successfully.'
   },
   607:{code: 607,
      es: 'Datos modificados con éxito.',
      en: 'Data modified successfully.'
   },
   608:{code: 608,
      es: 'Registro modificado con éxito.',
      en: 'Successfully modified record.'
   },
   609:{code: 609,
      es: 'Registro eliminado con éxito.',
      en: 'Record deleted successfully.'
   },
   610:{code: 610,
      es: 'Contraseña no válida, debe utilizar al menos una letra minúscula, una letra mayúscula, un número y al menos un carácter especial @$!%*#?&.',
      en: 'Invalid password, you must use at least one lowercase letter, one uppercase letter, one number and at least one special character @$!%*#?&.'
   },
   
   
   
};
