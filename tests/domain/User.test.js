const User = require('../../src/domain/User');

describe('Modelo de Usuario', () => {
    it('Debería lanzar error si faltan campos obligatorios', () => {
        const user = new User();
        const error = user.validateSync();

        expect(error.errors.username).toBeDefined();
        expect(error.errors.email).toBeDefined();
        expect(error.errors.password).toBeDefined();
        expect(error.errors.privacyPolicyAccepted).toBeDefined();
    });

    it('Debería crear un usuario válido con racha 0', () => {
        const validUser = new User({
            username: 'testuser',
            email: 'test@example.com',
            password: 'hashedpassword123',
            privacyPolicyAccepted: true
        });

        const error = validUser.validateSync();
        
        expect(error).toBeUndefined(); 
        expect(validUser.racha).toBe(0); 
    });
});