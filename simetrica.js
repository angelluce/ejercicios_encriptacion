// Importa CryptoJS si estás usando Node.js
const CryptoJS = require('crypto-js');

// Clave de encriptación (debería ser secreta y segura)
const clave = 'd3s4rr0ll0'; // La clave debe ser privada y segura
const clave128 = '1234567890abcdef';  // 128 bits (16 caracteres)
const clave192 = '1234567890abcdef12345678';  // 192 bits (24 caracteres)
const clave256 = '1234567890abcdef1234567890abcdef';  // 256 bits (32 caracteres)

// Texto a encriptar
const mensaje = 'Mi código no tiene bugs, solo desarrolla características no planificadas.';

// Encriptación

// Medición de tiempo de encriptación
console.time("Encriptación");

// Encriptamos el mensaje con cada clave de diferente tamaño
const mensajeEncriptado = CryptoJS.AES.encrypt(mensaje, clave).toString();
console.log("Mensaje encriptado:", mensajeEncriptado);

const mensajeEncriptado128 = CryptoJS.AES.encrypt(mensaje, clave128).toString();
console.log("Mensaje encriptado 128:", mensajeEncriptado128);

const mensajeEncriptado192 = CryptoJS.AES.encrypt(mensaje, clave192).toString();
console.log("Mensaje encriptado 192:", mensajeEncriptado192);

const mensajeEncriptado256 = CryptoJS.AES.encrypt(mensaje, clave256).toString();
console.log("Mensaje encriptado 256:", mensajeEncriptado256);

console.timeEnd("Encriptación");

// Desencriptación

// Medición de tiempo de desencriptación
console.time("Desencriptación");

// Desencriptamos el mensaje con cada clave utilizada
const bytes = CryptoJS.AES.decrypt(mensajeEncriptado, clave);
const mensajeDesencriptado = bytes.toString(CryptoJS.enc.Utf8); // Convertimos a UTF-8 para obtener el texto original
console.log("Mensaje desencriptado:", mensajeDesencriptado);

const bytes128 = CryptoJS.AES.decrypt(mensajeEncriptado128, clave128);
const mensajeDesencriptado128 = bytes128.toString(CryptoJS.enc.Utf8); // Convertimos a UTF-8 para obtener el texto original
console.log("Mensaje desencriptado 128:", mensajeDesencriptado128);

const bytes192 = CryptoJS.AES.decrypt(mensajeEncriptado192, clave192);
const mensajeDesencriptado192 = bytes192.toString(CryptoJS.enc.Utf8); // Convertimos a UTF-8 para obtener el texto original
console.log("Mensaje desencriptado 192:", mensajeDesencriptado192);

const bytes256 = CryptoJS.AES.decrypt(mensajeEncriptado256, clave256);
const mensajeDesencriptado256 = bytes256.toString(CryptoJS.enc.Utf8); // Convertimos a UTF-8 para obtener el texto original
console.log("Mensaje desencriptado 256:", mensajeDesencriptado256);

console.timeEnd("Desencriptación");
