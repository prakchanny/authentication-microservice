const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
require('dotenv').config();

app.use(express.json());

const JWT_SECRETE =  "347186591586" 

const users = [
    { username: 'joe', password: '123', role: 'student' },
    { username: 'chandan', password: '123', role: 'teacher' },
];
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Find user
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        const token = jwt.sign({ username: user.username, role: user.role }, JWT_SECRETE, { expiresIn: '24h' });
        res.json({ token });
    }
    return res.status(401).json({ message: 'Invalid credentials' });
});
app.listen(6000, () => {
    console.log('Authentication service is running on port 6000');
});