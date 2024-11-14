const crypto = require('crypto');

// Mensaje a hashear
const mensaje = "Mi código no tiene bugs, solo desarrolla características no planificadas.";

// Creación del hash usando SHA-256
const hash = crypto.createHash('sha256').update(mensaje).digest('hex');
console.log("Hash del mensaje:", hash);

// Creación de un 'salt' aleatorio
const salt = crypto.randomBytes(16).toString('hex');
const hashConSalt = crypto.createHash('sha256').update(salt + mensaje).digest('hex');

console.log("Salt:", salt);
console.log("Hash con Salt:", hashConSalt);

// Validación para comparar hashes con y sin salt
if (hash !== hashConSalt) {
    console.log("El hash con salt es diferente al hash original.");
} else {
    console.log("El hash con salt es igual al hash original.");
}

// Para verificar que el hash con salt y el mensaje coinciden en un futuro
// Al almacenar el salt junto con el hash puedes verificar el hash original al concatenar el salt de nuevo
const hashVerificado = crypto.createHash('sha256').update(salt + mensaje).digest('hex');
if (hashVerificado === hashConSalt) {
    console.log("El hash verificado coincide con el hash con salt.");
} else {
    console.log("El hash verificado no coincide.");
}
