const socket = io();

socket.on('mensaje', (datos) => {
    console.log(datos);
})