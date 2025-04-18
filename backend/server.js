const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');

const app = express();
const client = new OAuth2Client('902395675237-uo029rp0od1ramc8bsmt3eb76kkeb4md.apps.googleusercontent.com'); // Reemplaza con tu Client ID

app.use(cors());
app.use(express.json());

const users = [
  {
    id: 1,
    email: 'test@ejemplo.com',
    password: bcrypt.hashSync('password123', 10)
  }
];

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ error: 'Usuario no encontrado' });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ error: 'Contraseña incorrecta' });
  }
  const token = jwt.sign({ id: user.id, email: user.email }, 'secreto', { expiresIn: '1h' });
  res.json({ token, user: { id: user.id, email: user.email } });
});

app.post('/auth/google', async (req, res) => {
  const { idToken } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: '902395675237-uo029rp0od1ramc8bsmt3eb76kkeb4md.apps.googleusercontent.com'
    });
    const payload = ticket.getPayload();
    const user = {
      id: payload['sub'],
      email: payload['email'],
      name: payload['name']}
    const token = jwt.sign({ id: userid, email }, 'secreto', { expiresIn: '1h' });
    res.json({ token, user });
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.status(401).json({ error: 'Token inválido' });
  }
});

app.get('/', (req, res) => {
  res.send('¡Backend funcionando!');
});

app.get('/favicon.ico', (req, res) => res.status(204).end());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});