const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    
  
    metaFisica: { type: String, required: true }, 
    penalizacion: { type: String, required: true }, 
    
    
    deudas: [{
        deudor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        acreedor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        motivo: { type: String },
        resuelta: { type: Boolean, default: false }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema);