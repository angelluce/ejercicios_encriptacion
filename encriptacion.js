const crypto = require('crypto');

// Generar par de claves RSA para el ejemplo (normalmente, ya tendrías un par de claves)
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
});

// Configuración para encriptación simétrica
const algoritmoSimetrico = 'aes-256-ctr';
const claveSimetrica = crypto.randomBytes(32); // Clave de 256 bits
const iv = crypto.randomBytes(16); // Vector de inicialización de 16 bytes

// Función para encriptar el mensaje usando encriptación híbrida
function encriptarMensajeHibrido(mensaje) {
  // Encriptación simétrica del mensaje
  const cipher = crypto.createCipheriv(algoritmoSimetrico, claveSimetrica, iv);
  const mensajeEncriptado = Buffer.concat([cipher.update(mensaje), cipher.final()]);

  // Encriptación asimétrica de la clave simétrica
  const claveSimetricaEncriptada = crypto.publicEncrypt(publicKey, claveSimetrica);

  // Devolver el mensaje encriptado, la clave simétrica encriptada y el IV
  return {
    mensajeEncriptado: mensajeEncriptado.toString('hex'),
    claveSimetricaEncriptada: claveSimetricaEncriptada.toString('hex'),
    iv: iv.toString('hex')
  };
}

// Función para desencriptar el mensaje usando encriptación híbrida
function desencriptarMensajeHibrido(datosEncriptados) {
  const { mensajeEncriptado, claveSimetricaEncriptada, iv } = datosEncriptados;

  // Desencriptar la clave simétrica usando la clave privada
  const claveSimetrica = crypto.privateDecrypt(
    privateKey,
    Buffer.from(claveSimetricaEncriptada, 'hex')
  );

  // Desencriptar el mensaje usando la clave simétrica desencriptada
  const decipher = crypto.createDecipheriv(algoritmoSimetrico, claveSimetrica, Buffer.from(iv, 'hex'));
  const mensajeDesencriptado = Buffer.concat([
    decipher.update(Buffer.from(mensajeEncriptado, 'hex')),
    decipher.final()
  ]);

  // Devolver el mensaje desencriptado
  return mensajeDesencriptado.toString();
}

// Prueba del sistema de encriptación híbrida
const mensaje = "Mi código no tiene bugs, solo desarrolla características no planificadas";

// Encriptación
const datosEncriptados = encriptarMensajeHibrido(mensaje);
console.log("Mensaje Encriptado:", datosEncriptados.mensajeEncriptado);
console.log("Clave Simétrica Encriptada:", datosEncriptados.claveSimetricaEncriptada);
console.log("IV:", datosEncriptados.iv);

// Desencriptación
const mensajeDesencriptado = desencriptarMensajeHibrido(datosEncriptados);
console.log("Mensaje Desencriptado:", mensajeDesencriptado);
