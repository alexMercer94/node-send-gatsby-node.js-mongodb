const Enlaces = require('../models/Enlace');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.newLink = async (req, res, next) => {
    // Show error from express validator
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Create link's object
    const { original_name, password } = req.body;
    const link = new Enlaces();
    link.url = shortid.generate();
    link.name = shortid.generate();
    link.original_name = original_name;
    link.password = password;

    // If user is authenticated
    if (req.user) {
        const { password, downloads } = req.body;
        if (downloads) {
            link.downloads = downloads;
        }

        if (password) {
            const salt = await bcrypt.genSalt(10);
            link.password = await bcrypt.hash(password, salt);
        }

        link.author = req.user.id;
    }
    // Sve in db
    try {
        await link.save();
        return res.json({ msg: `${link.url}` });
        next();
    } catch (error) {
        console.log(error);
    }
};

/**
 * Get Link
 * @param {*} req
 * @param {*} res
 */
exports.getLink = async (req, res, next) => {
    const { url } = req.params;
    // Check if exiist link
    const link = await Enlaces.findOne({ url });
    if (!link) {
        res.status(404).json({ msg: 'El enlace no existe' });
        return next();
    }
    res.json({ file: link.name });
    const { downloads, name } = link;

    if (downloads === 1) {
        // Delete file
        req.file = name;
        await Enlaces.findOneAndRemove(url);

        next();
    } else {
        link.downloads--;
        await link.save();
    }
};
