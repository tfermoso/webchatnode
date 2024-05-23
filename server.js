const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

app.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
})

server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});