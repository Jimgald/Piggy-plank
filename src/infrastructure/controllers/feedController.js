const Post = require('../../domain/Post');
const User = require('../../domain/User');
const achievementService = require('../../application/achievementService');

exports.uploadProof = async (req, res) => {
    try {
        const { groupId, imageUrl, comentario } = req.body;

        
        const newPost = new Post({
            user: req.user,
            group: groupId,
            imageUrl,
            comentario
        });
        await newPost.save();

        
        const user = await User.findById(req.user);
        user.racha += 1;
        await user.save();

        
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
        
        
        const posts = await Post.find({ group: groupId })
            .populate('user', 'username racha') 
            .sort({ createdAt: -1 })
            .limit(20); 
            
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};