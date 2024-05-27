const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const mongoose = require("mongoose")
const User = require('./models/user');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const isAuthenticated = require('./middleware/authenticated');

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
let usuarios=[];

app.use(express.static('public'));

// Configurar el middleware de sesión con connect-mongo
const session_middleware=session({
    secret: 'mysecret', // Cambia esto por una cadena secreta segura
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/tresenraya',
        collectionName: 'sessions'
    })});
app.use(session_middleware);

// Conectar a MongoDB{_id,name}
mongoose.connect('mongodb://localhost:27017/tresenraya')
    .then(() => {
        console.log('Conectado a MongoDB');
    }).catch(err => {
        console.error('Error al conectar a MongoDB', err);
    });

//Socket
//Socket Session
io.use((socket,next)=>{
    session_middleware(socket.request,socket.request.next||{},next);
});

io.on('connection', (socket) => {
        console.log("Nuevo cliente conectado" + socket.id);
        const {_id,name}=socket.request.session.user;
        usuarios.push({_id,name})
        io.emit("mensaje",usuarios);


        socket.on('disconnect',()=>{
            console.log("Se ha desconectado un cliente")
        })

        socket.on('mensaje', (mensaje) => {
            console.log(mensaje);
            socket.broadcast.emit('mensaje', mensaje);
        })
})


app.get("/login", (req, res) => {
    //res.sendFile(path.join(__dirname, 'public', 'login.html'));
    const error = req.query.error || '';;
    res.render('login', { error });
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.render('login', { error: 'Usuario o contraseña incorrecto' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.render('login', { error: 'Usuario o contraseña incorrecto' });
        }
        req.session.user=user;
        res.redirect('/juego');
    } catch (error) {
        console.error(error);
        res.render('login', { error: 'Error de conexion a la base de datos' });
    }

})

app.get("/register",(req,res)=>{
    let error="";
    res.render("register",{error}); 
})

app.post("/register", async (req, res) => {
    const {name,email,password}=req.body;
    let usuario = new User({ name, email, password });
    try {
        await usuario.save();
        res.redirect("/login");
    } catch (error) {      
        res.render("register",{error:"Error de conexion a bbdd"});
    }
})

app.get("/juego", isAuthenticated,(req, res) => {
    let {_id,name}=req.session.user;
    res.render("juego",{_id,name});
})

server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});