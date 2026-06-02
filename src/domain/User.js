const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
    
    racha: { type: Number, default: 0 },
    vidas: { type: Number, default: 3 },
    logros: [{ type: String }], 
    
    
    amigos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    
   
    privacyPolicyAccepted: { type: Boolean, required: true },
    privacyPolicyAcceptedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);