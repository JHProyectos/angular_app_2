// Importamos el módulo 'child_process' de Node.js para ejecutar comandos del sistema operativo (como Git) desde JavaScript.
// Usamos 'execSync' para ejecutar comandos de forma síncrona, es decir, uno después del otro, esperando a que cada comando termine antes de pasar al siguiente.
const { execSync } = require('child_process');

// Obtenemos los argumentos pasados desde la línea de comandos.
// 'process.argv' es un array que contiene los argumentos con los que se ejecutó el script.
// Los primeros dos elementos son el path de Node.js y el path del script (commit.js), por lo que los argumentos reales comienzan desde el índice 2.
// Ejemplo: Si ejecutamos 'npm run commit -- -mensaje "mi mensaje"', process.argv será:
// ['/path/to/node', '/path/to/commit.js', '-mensaje', 'mi mensaje']
const args = process.argv.slice(2);

// Buscamos el índice del argumento '-mensaje' en el array 'args'.
// 'findIndex' devuelve el índice del primer elemento que cumple con la condición (en este caso, que sea igual a '--mensaje').
// Sumamos 1 para obtener el índice del mensaje real que viene después de '-mensaje'.
// Ejemplo: Si args es ['-mensaje', 'mi mensaje'], entonces messageIndex será 1 (el índice de 'mi mensaje').
const messageIndex = args.findIndex(arg => arg === '-mensaje') + 1;

// Definimos el mensaje de commit.
// Si se proporcionó un mensaje (messageIndex > 0 y args[messageIndex] existe), usamos ese mensaje.
// Si no se proporcionó un mensaje, usamos un mensaje por defecto: 'Actualización automática'.
// Esto asegura que el script no falle si el usuario olvida pasar un mensaje.
// Ejemplo: Si args es ['-mensaje', 'mi mensaje'], commitMessage será 'mi mensaje'.
// Si args es [], commitMessage será 'Actualización automática'.
const commitMessage = messageIndex > 0 && args[messageIndex] ? args[messageIndex] : 'Actualización automática';

// Usamos un bloque try-catch para manejar posibles errores al ejecutar los comandos de Git.
// Si ocurre un error (por ejemplo, no hay cambios para commitear o falla el push), el catch capturará el error y lo mostrará.
try {
  // Mostramos un mensaje en la consola para indicar que estamos agregando los archivos.
  console.log('Agregando archivos...');
  
  // Ejecutamos el comando 'git add .' para agregar todos los cambios en el directorio actual al staging area de Git.
  // 'execSync' ejecuta el comando y espera a que termine.
  // El objeto { stdio: 'inherit' } hace que la salida del comando (como mensajes de Git) se muestre directamente en la consola.
  execSync('git add .', { stdio: 'inherit' });

  // Mostramos un mensaje indicando que estamos creando el commit con el mensaje proporcionado.
  console.log(`Creando commit con mensaje: "${commitMessage}"...`);
  
  // Ejecutamos 'git commit -m "mensaje"' para crear un commit con el mensaje que obtuvimos.
  // Usamos comillas alrededor del mensaje para manejar casos donde el mensaje tenga espacios.
  // Ejemplo: Si commitMessage es "mi mensaje", el comando será 'git commit -m "mi mensaje"'.
  execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });

  // Mostramos un mensaje indicando que estamos subiendo los cambios a la rama main.
  console.log('Subiendo cambios a la rama main...');
  
  // Ejecutamos 'git push origin main' para subir los cambios al repositorio remoto en la rama 'main'.
  // Esto asume que la rama principal se llama 'main'. Si tu rama principal es 'master', puedes cambiar 'main' por 'master'.
  execSync('git push origin main', { stdio: 'inherit' });

  // Si todos los comandos se ejecutaron correctamente, mostramos un mensaje de éxito.
  console.log('¡Cambios subidos exitosamente!');
} catch (error) {
  // Si ocurre un error en cualquiera de los comandos de Git, lo capturamos aquí.
  // Mostramos un mensaje de error con los detalles del problema (error.message).
  // Por ejemplo, si no estás autenticado en GitHub, el 'git push' fallará y se mostrará el error.
  console.error('Error al ejecutar los comandos de Git:', error.message);
  
  // Salimos del script con un código de error (1) para indicar que algo salió mal.
  // Esto es útil si estás usando este script en un entorno automatizado (como CI/CD).
  process.exit(1);
}