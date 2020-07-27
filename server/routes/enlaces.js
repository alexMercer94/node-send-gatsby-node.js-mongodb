const express = require('express');
const router = express.Router();
const enlaceController = require('../controllers/enlaceController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.post(
    '/',
    [check('name', 'Sube un archivo').not().isEmpty(), check('original_name', 'Sube un archivo').not().isEmpty()],
    auth,
    enlaceController.newLink
);

module.exports = router;
