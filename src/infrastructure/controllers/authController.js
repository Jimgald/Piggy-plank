const User = require('../../domain/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, email, password, privacyPolicyAccepted } = req.body;

        if (!privacyPolicyAccepted) {
            return res.status(400).json({ message: 'Debe aceptar la política de privacidad' });
        }

        const userExists = await User.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            return res.status(400).json({ message: 'El usuario o email ya está registrado' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            privacyPolicyAccepted
        });

        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Credenciales no válidas' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        
        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                racha: user.racha,
                vidas: user.vidas
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};