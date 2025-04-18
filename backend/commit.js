const { execSync } = require('child_process');
const path = require('path');

function commitChanges(message) {
  try {
    // Configurar el directorio del repositorio
    const repoPath = path.resolve(__dirname);
    
    // Agregar todos los cambios
    execSync('git add .', { cwd: repoPath, stdio: 'inherit' });
    
    // Hacer el commit con el mensaje proporcionado
    execSync(`git commit -m "${message}"`, { cwd: repoPath, stdio: 'inherit' });
    
    // Opcional: Hacer push al repositorio remoto
    execSync('git push origin main', { cwd: repoPath, stdio: 'inherit' });
    
    console.log('Commit realizado con éxito:', message);
  } catch (error) {
    console.error('Error al realizar el commit:', error.message);
    process.exit(1);
  }
}

// Ejecutar el script con un mensaje de commit desde la línea de comandos
const commitMessage = process.argv[2] || 'Actualización automática';
commitChanges(commitMessage);