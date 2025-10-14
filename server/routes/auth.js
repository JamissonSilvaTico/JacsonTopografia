import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect } from '../middleware/authMiddleware.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Credenciais inválidas.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Change user password
// @route   POST /api/auth/change-password
// @access  Private
router.post('/change-password', protect, async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        const isMatch = await user.matchPassword(oldPassword);

        if (!isMatch) {
            return res.status(401).json({ message: 'A senha antiga está incorreta.' });
        }

        if (!newPassword || newPassword.length < 6) {
           return res.status(400).json({ message: 'A nova senha deve ter pelo menos 6 caracteres.' });
        }

        user.password = newPassword;
        await user.save();

        res.json({ success: true, message: 'Senha alterada com sucesso.' });

    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});


export default router;
