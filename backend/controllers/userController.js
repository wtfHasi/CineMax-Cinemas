import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserController = {
  registerUser: async (req, res) => {
    try {
      const { username, password, role } = req.body;

      // Prevent duplicate usernames
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) return res.status(400).json({ message: 'Username already taken' });

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, password_hash: hashedPassword, role });

      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });

      if (!user || !(await bcrypt.compare(password, user.password_hash))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default UserController;