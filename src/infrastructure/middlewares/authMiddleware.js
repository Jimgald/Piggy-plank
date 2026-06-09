const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Leer el token de las cabeceras (headers) de la petición
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'No hay token, autorización denegada' });
    }

    try {
        // Quitamos la palabra "Bearer " si viene incluida y verificamos el token
        const tokenLimpio = token.replace('Bearer ', '');
        const decoded = jwt.verify(tokenLimpio, process.env.JWT_SECRET);
        
        // Guardamos el ID del usuario en la request para que los siguientes controladores lo puedan usar
        req.user = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token no válido o expirado' });
    }
};