const jwt = require('jsonwebtoken');
const { use } = require('../routes/auth');
require('dotenv').config({ path: 'variables.env' });

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');

    if (authHeader) {
        // Get token
        const token = authHeader.split(' ')[1];

        // Check JWT
        try {
            const user = jwt.verify(token, process.env.SECRET);
            req.user = user;
        } catch (error) {
            console.log(error);
            console.log('JWT no válido');
        }
    }

    return next();
};
