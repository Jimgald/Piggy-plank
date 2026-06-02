const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    
    // Reglas del grupo
    metaFisica: { type: String, required: true }, // Ej: "Correr 5km semanales"
    penalizacion: { type: String, required: true }, // Ej: "Pagar una cena"
    
    // Registro de deudas (Para la pantalla Home/Ranking)
    deudas: [{
        deudor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        acreedor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        motivo: { type: String },
        resuelta: { type: Boolean, default: false }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema);