const express = require('express');
const router = express.Router();
const enlaceController = require('../controllers/enlaceController');
const filesController = require('../controllers/filesController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.post(
    '/',
    [check('name', 'Sube un archivo').not().isEmpty(), check('original_name', 'Sube un archivo').not().isEmpty()],
    auth,
    enlaceController.newLink
);

router.get('/', enlaceController.getAllLinks);

router.get('/:url', enlaceController.hasPassword, enlaceController.getLink);

router.post('/:url', enlaceController.verifyPassword, enlaceController.getLink);

module.exports = router;
