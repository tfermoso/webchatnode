const mongoose=require("mongoose")
const partidaSchema = new mongoose.Schema({
    player1:{
        type:String,
        required:true,
    },
    player2: {
        type: String,
        required: false,
    },
    turno: {
        type: String,
    },
    estado:{
        type:String,
    },
    tablero:{
        type:Array,
    }
});

module.exports = mongoose.model('Partida', partidaSchema);