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
    const { original_name, name, password } = req.body;
    const link = new Enlaces();
    link.url = shortid.generate();
    link.name = name;
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
            link.password = await bcrypt.hash(`${password}`, salt);
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
 * Get all links
 * @param {*} req
 * @param {*} res
 */
exports.getAllLinks = async (req, res) => {
    try {
        const enlaces = await Enlaces.find({}).select('url -_id');
        res.json({ enlaces });
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
    res.json({ file: link.name, password: false });
    next();
};

/**
 * Verify if link has a password
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.hasPassword = async (req, res, next) => {
    const { url } = req.params;
    // Check if exiist link
    const link = await Enlaces.findOne({ url });
    if (!link) {
        res.status(404).json({ msg: 'El enlace no existe' });
        return next();
    }

    if (link.password) {
        return res.json({ password: true, enlace: link.url });
    }

    next();
};

/**
 * Validate password
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.verifyPassword = async (req, res, next) => {
    const { url } = req.params;
    const { password } = req.body;

    const enlace = await Enlaces.findOne({ url });

    if (bcrypt.compareSync(password, enlace.password)) {
        // Permitir descargar el archivo
        next();
    } else {
        return res.status(401).json({ msg: 'Password Inconrrecto' });
    }
};
