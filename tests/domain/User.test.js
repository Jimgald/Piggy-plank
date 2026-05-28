const User = require('../../../src/domain/User');

describe('Modelo de Usuario', () => {
    it('Debería lanzar error si faltan campos obligatorios (email, password, RGPD)', () => {
        const user = new User(); // Intentamos crear uno vacío
        const error = user.validateSync(); // Valida las reglas de Mongoose sin ir a la BD

        expect(error.errors.email).toBeDefined();
        expect(error.errors.password).toBeDefined();
        expect(error.errors.privacyPolicyAccepted).toBeDefined();
    });

    it('Debería crear un usuario válido con los datos correctos y racha en 0', () => {
        const validUser = new User({
            email: 'test@example.com',
            password: 'hashedpassword123',
            privacyPolicyAccepted: true
        });

        const error = validUser.validateSync();
        
        expect(error).toBeUndefined(); // Si es undefined, significa que no hay errores
        expect(validUser.racha).toBe(0); // Comprobamos que el valor por defecto funciona
    });
});