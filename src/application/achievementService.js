const User = require('../domain/User');

exports.checkAndAwardAchievements = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) return [];

        const nuevosLogros = [];

        // Reglas de Gamificación estáticas (Hardcoded para el MVP)
        if (user.racha >= 7 && !user.logros.includes('Fuego Inicial: 7 días seguidos')) {
            nuevosLogros.push('Fuego Inicial: 7 días seguidos');
        }
        
        if (user.racha >= 14 && !user.logros.includes('Imparable: 14 días seguidos')) {
            nuevosLogros.push('Imparable: 14 días seguidos');
        }

        if (user.racha >= 30 && !user.logros.includes('Leyenda: 1 mes de hierro')) {
            nuevosLogros.push('Leyenda: 1 mes de hierro');
        }

        // Si hay nuevos logros ganados, los guardamos en la base de datos
        if (nuevosLogros.length > 0) {
            user.logros.push(...nuevosLogros);
            await user.save();
        }

        // Devolvemos los nuevos logros para poder mostrar una alerta en el frontend si queremos
        return nuevosLogros;
    } catch (error) {
        console.error('Error procesando logros:', error);
        return [];
    }
};