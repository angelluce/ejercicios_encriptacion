const NodeRSA = require('node-rsa');

// Generación de claves (tamaño de 256 bits para simplificar; puedes usar 2048 o 4096 para mayor seguridad)
const key = new NodeRSA({ b: 2048 }); // 'b' es el tamaño en bits de la clave

// Genera el par de claves
const clavePublica = key.exportKey('public'); // Exporta la clave pública
const clavePrivada = key.exportKey('private'); // Exporta la clave privada

console.log("Clave pública:", clavePublica);
console.log("Clave privada:", clavePrivada);

// Mensaje a encriptar
const mensaje = "Mi código no tiene bugs, solo desarrolla características no planificadas.";

// Encriptación con la clave pública
// La encriptación se hace con la clave pública para que solo la clave privada pueda desencriptarlo
const mensajeEncriptado = key.encrypt(mensaje, 'base64'); // 'base64' es el formato en el que se devuelve el mensaje encriptado
console.log("Mensaje encriptado:", mensajeEncriptado);

// Desencriptación con la clave privada
// La desencriptación se realiza con la clave privada, que solo tiene el receptor
const mensajeDesencriptado = key.decrypt(mensajeEncriptado, 'utf8'); // 'utf8' es el formato para devolver el texto desencriptado
console.log("Mensaje desencriptado:", mensajeDesencriptado);

// Comprobación de que la desencriptación es correcta
if (mensaje === mensajeDesencriptado) {
    console.log("La desencriptación es correcta");
} else {
    console.log("La desencriptación ha fallado");
}

