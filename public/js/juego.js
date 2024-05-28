const socket = io();
let connectedUsers = document.getElementById("connectedUsers");
socket.on('pendientes', (datos) => {
    console.log(datos);
})

socket.on('mensaje', (datos) => {
    const p = document.createElement('p');
    p.innerText = datos.name + ": " + datos.mensaje;
    document.getElementById("chatgeneral").appendChild(p);
})
socket.on('privados', (datos) => {
    const p = document.createElement('p');
    p.innerText = datos;
    document.getElementById("chatprivado").appendChild(p);
    //Creo partida pendiente
    const li = document.createElement('li');
    li.textContent = "partida de" + datos.name;
    li.classList.add('list-group-item');
    document.getElementById("partidasPendientes").appendChild(li);

})
socket.on('usuarios', (datos) => {
    connectedUsers.innerHTML = "";
    datos.forEach(user => {
        if (!document.getElementById(user._id)) {
            const li = document.createElement('li');
            li.id = user.socketId;
            li.setAttribute('data-id', user._id);
            li.textContent = user.name;
            li.classList.add('list-group-item');
            li.onclick = (e) => {
                let datos = {
                    userId: e.target.dataset.id,
                    socketID: e.currentTarget.id,
                    name: e.currentTarget.innerHTML
                }
                console.log(datos)
                socket.emit("invitaciones", datos);
            }
            connectedUsers.appendChild(li);
        }
    });


    //console.log(datos);
})


document.getElementById("btnEnviar").onclick = () => {
    let texto = document.getElementById("texto").value;
    document.getElementById("texto").value = "";
    socket.emit("mensaje", texto);
}