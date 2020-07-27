const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });
const { validationResult } = require('express-validator');

exports.authenticateUser = async (req, res, next) => {
    // Check if there are errors
    // Show error from express validator
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Search user fot check if is registered
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        res.status(401).json({ msg: 'El usuario no existe' });
        return next();
    }
    // Check password and auth user
    if (bcrypt.compareSync(password, user.password)) {
        // Create JWT
        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
            },
            process.env.SECRET,
            {
                expiresIn: '8h',
            }
        );

        res.json({ token });
    } else {
        res.status(401).json({ msg: 'Password Incorrecto' });
    }
};

exports.userAuthneticated = (req, res, next) => {
    res.json({ user: req.user });
};
