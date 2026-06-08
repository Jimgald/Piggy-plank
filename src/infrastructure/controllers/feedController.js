const Post = require('../../domain/Post');
const User = require('../../domain/User');
const achievementService = require('../../application/achievementService');

exports.uploadProof = async (req, res) => {
    try {
        const { groupId, imageUrl, comentario } = req.body;

        // 1. Guardamos la publicación en el Feed
        const newPost = new Post({
            user: req.user,
            group: groupId,
            imageUrl,
            comentario
        });
        await newPost.save();

        // 2. Sumamos 1 a la racha del usuario
        const user = await User.findById(req.user);
        user.racha += 1;
        await user.save();

        // 3. Disparamos el motor de logros (servicio en segundo plano)
        const nuevosLogros = await achievementService.checkAndAwardAchievements(req.user);

        res.status(201).json({ 
            message: 'Prueba subida correctamente. ¡Racha aumentada!', 
            post: newPost,
            nuevaRacha: user.racha,
            logrosDesbloqueados: nuevosLogros 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getGroupFeed = async (req, res) => {
    try {
        const { groupId } = req.params;
        
        // Buscamos los posts de este grupo, ordenados por los más recientes
        const posts = await Post.find({ group: groupId })
            .populate('user', 'username racha') // Traemos el nombre y racha de quien publicó
            .sort({ createdAt: -1 })
            .limit(20); // Paginación básica para el MVP
            
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};