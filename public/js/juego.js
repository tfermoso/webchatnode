const socket = io();
let connectedUsers = document.getElementById("connectedUsers");
socket.on('pendientes', (datos) => {
    console.log(datos);
})
socket.on('usuarios', (datos) => {
    connectedUsers.innerHTML = "";
    datos.forEach(user => {
        if (!document.getElementById(user._id)) {
            const li = document.createElement('li');
            li.id = user.socketId;
            li.textContent = user.name;
            li.classList.add('list-group-item');
            li.onclick = (e) => {
                alert(e.currentTarget.id)
                socket.emit("invitaciones", e.currentTarget.id);
            }
            connectedUsers.appendChild(li);
        }
    });


    //console.log(datos);
})


document.getElementById("btnEnviar").onclick = () => {
    let texto = document.getElementById("texto").value;
    socket.emit("mensaje", texto);
}