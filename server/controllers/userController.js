const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

/**
 * Create new user
 */
exports.newUser = async (req, res) => {
    // Show error from express validator
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Verify if a user exist
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) {
        return res.status(400).json({ msg: 'El usuario ya esta registrado' });
    }

    // Create new user
    user = new User(req.body);
    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    try {
        await user.save();
        res.json({ msg: 'Usuario creado correctamente' });
    } catch (error) {
        console.log(error);
    }
};
