const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
// Configura el middleware para manejar datos JSON y datos codificados en URL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Configura el motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.get("/login", (req, res) => {
    //res.sendFile(path.join(__dirname, 'public', 'login.html'));
    let error="";
    res.render('login',{error});

})

app.post("/login", (req, res) => {
    const {email,password}=req.body;
    if(email=="admin@gmail.com" & password=="1234"){
        res.redirect("/juego");
    }else{
        res.render('login', { error: 'Usuario o password incorrecta'});

    }
})

app.get("/juego",(req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'juego.html'));
})

server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});