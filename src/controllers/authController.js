const bcrypt = require('bcryptjs');
const jwtHelper = require('../utils/jwt');
const User = require('../models/users');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'invalid credentials' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'invalid credentials' });

        const token = jwtHelper.generateToken(user);
        return res.status(200).json({ token, user: { id: user._id, name: user.name, role: user.role } });
    }catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.signup = async (req, res) => {
    const { name, email, password, role } = req.body;
    console.log('Signup data:', { name, email, password, role });
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already exists' });
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();
        const token = jwtHelper.generateToken(newUser);
        return res.status(201).json({ token, user: { id: newUser._id, name: newUser.name, role: newUser.role } });
    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};