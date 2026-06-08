const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
    imageUrl: { type: String, required: true }, // La URL de la foto que nos mandará el frontend
    comentario: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);