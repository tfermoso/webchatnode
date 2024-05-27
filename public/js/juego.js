const socket = io();
let connectedUsers=document.getElementById("connectedUsers");

socket.on('mensaje', (datos) => {
    const li = document.createElement('li');
    li.textContent = datos._id +"-"+datos.name;
    connectedUsers.appendChild(li);
    //console.log(datos);
})


document.getElementById("btnEnviar").onclick=()=>{
    let texto=document.getElementById("texto").value;
    socket.emit("mensaje",texto);
}