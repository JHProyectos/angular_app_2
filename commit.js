const { execSync } = require('child_process');

// Obtener el mensaje de commit desde los argumentos de la línea de comandos
const args = process.argv.slice(2);
const messageIndex = args.findIndex(arg => arg === '-mensaje') + 1;
const commitMessage = messageIndex > 0 && args[messageIndex] ? args[messageIndex] : 'Actualización automática';

// Ejecutar comandos de Git
try {
  console.log('Agregando archivos...');
  execSync('git add .', { stdio: 'inherit' });

  console.log(`Creando commit con mensaje: "${commitMessage}"...`);
  execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });

  console.log('Subiendo cambios a la rama main...');
  execSync('git push origin main', { stdio: 'inherit' });

  console.log('¡Cambios subidos exitosamente!');
} catch (error) {
  console.error('Error al ejecutar los comandos de Git:', error.message);
  process.exit(1);
}