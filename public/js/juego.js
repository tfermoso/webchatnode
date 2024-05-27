const socket = io();

socket.on('mensaje', (datos) => {
    console.log(datos);
})


document.getElementById("btnEnviar").onclick=()=>{
    let texto=document.getElementById("texto").value;
    socket.emit("mensaje",texto);
}