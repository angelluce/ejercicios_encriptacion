const crypto = require('crypto');

// Configuración
const algoritmo = 'aes-256-ctr';
const clave = crypto.randomBytes(32); // Clave de 256 bits
const iv = crypto.randomBytes(16); // Vector de inicialización de 16 bytes

// Función para encriptar
function encriptar(mensaje) {
    // Crear el cifrador con el algoritmo AES-256-CTR, clave e IV
    const cipher = crypto.createCipheriv(algoritmo, clave, iv);
    // Cifrar el mensaje y concatenar los fragmentos
    const mensajeEncriptado = Buffer.concat([cipher.update(mensaje), cipher.final()]);
    // Retornar el mensaje cifrado en formato hexadecimal
    return mensajeEncriptado.toString('hex');
}

// Función para desencriptar
function desencriptar(mensajeEncriptado) {
    // Crear el descifrador con el mismo algoritmo, clave e IV
    const decipher = crypto.createDecipheriv(algoritmo, clave, iv);
    // Desencriptar el mensaje y concatenar los fragmentos
    const mensajeDesencriptado = Buffer.concat([decipher.update(Buffer.from(mensajeEncriptado, 'hex')), decipher.final()]);
    // Retornar el mensaje desencriptado como texto
    return mensajeDesencriptado.toString();
}

// Prueba
const mensaje = "Mi código no tiene bugs, solo desarrolla características no planificadas.";

// Encriptación
const mensajeEncriptado = encriptar(mensaje);
console.log("Mensaje Encriptado:", mensajeEncriptado);

// Desencriptación
const mensajeDesencriptado = desencriptar(mensajeEncriptado);
console.log("Mensaje Desencriptado:", mensajeDesencriptado);
