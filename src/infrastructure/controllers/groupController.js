const Group = require('../../domain/Group');

exports.createGroup = async (req, res) => {
    try {
        const { name, metaFisica, penalizacion } = req.body;
        
        const newGroup = new Group({
            name,
            metaFisica,
            penalizacion,
            members: [req.user] // El creador se añade automáticamente usando el ID del token
        });
        
        await newGroup.save();
        res.status(201).json({ message: 'Grupo creado con éxito', group: newGroup });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.joinGroup = async (req, res) => {
    try {
        const { groupId } = req.body;
        
        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ message: 'Grupo no encontrado' });

        if (group.members.includes(req.user)) {
            return res.status(400).json({ message: 'Ya eres miembro de este grupo' });
        }

        group.members.push(req.user);
        await group.save();
        
        res.json({ message: 'Te has unido al grupo correctamente', group });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserGroups = async (req, res) => {
    try {
        // Busca todos los grupos donde el array de members contenga el ID del usuario actual
        const groups = await Group.find({ members: req.user });
        res.json(groups);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};