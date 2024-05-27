const socket = io();
let connectedUsers = document.getElementById("connectedUsers");

socket.on('mensaje', (datos) => {
    datos.forEach(user => {
        if (!document.getElementById(user._id)) {
            const li = document.createElement('li');
            li.id = user._id;
            li.textContent = user.name;
            connectedUsers.appendChild(li);
        }
    });


    //console.log(datos);
})


document.getElementById("btnEnviar").onclick = () => {
    let texto = document.getElementById("texto").value;
    socket.emit("mensaje", texto);
}