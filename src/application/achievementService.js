const User = require('../domain/User');

exports.checkAndAwardAchievements = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) return [];

        const nuevosLogros = [];

        
        if (user.racha >= 7 && !user.logros.includes('Fuego Inicial: 7 días seguidos')) {
            nuevosLogros.push('Fuego Inicial: 7 días seguidos');
        }
        
        if (user.racha >= 14 && !user.logros.includes('Imparable: 14 días seguidos')) {
            nuevosLogros.push('Imparable: 14 días seguidos');
        }

        if (user.racha >= 30 && !user.logros.includes('Leyenda: 1 mes de hierro')) {
            nuevosLogros.push('Leyenda: 1 mes de hierro');
        }

       
        if (nuevosLogros.length > 0) {
            user.logros.push(...nuevosLogros);
            await user.save();
        }

       
        return nuevosLogros;
    } catch (error) {
        console.error('Error procesando logros:', error);
        return [];
    }
};