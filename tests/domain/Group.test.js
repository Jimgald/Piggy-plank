// const Group = require('../../src/domain/Group');

describe('Modelo de Grupo', () => {
    it('Debería lanzar error si faltan campos obligatorios (nombre, meta y penalización)', () => {
        const group = new Group();
        const error = group.validateSync();
        
        expect(error.errors.name).toBeDefined();
        expect(error.errors.metaFisica).toBeDefined();
        expect(error.errors.penalizacion).toBeDefined();
    });
});//