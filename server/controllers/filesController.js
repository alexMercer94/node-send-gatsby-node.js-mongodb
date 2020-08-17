const fs = require('fs');
const Enlaces = require('../models/Enlace');

// Subida de archivos
const multer = require('multer');
const shortId = require('shortid');

/**
 * Upload a file
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.uploadFile = async (req, res, next) => {
    const multerSettings = {
        limits: {
            fileSize: req.user ? 1024 * 1024 * 10 : 1000000,
        },
        storage: (fileStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, __dirname + '/../uploads');
            },
            filename: (req, file, cb) => {
                const extension = file.originalname.substring(
                    file.originalname.lastIndexOf('.'),
                    file.originalname.length
                );
                cb(null, `${shortId.generate()}${extension}`);
            },
        })),
    };

    const upload = multer(multerSettings).single('file');

    upload(req, res, async (error) => {
        if (!error) {
            res.json({ file: req.file.filename });
        } else {
            console.log(error);
            return next();
        }
    });
};

/**
 * Delete file
 * @param {*} req
 * @param {*} res
 */
exports.deleteFile = async (req, res) => {
    console.log(req.file);
    try {
        fs.unlinkSync(__dirname + `/../uploads/${req.file}`);
        console.log('Archivo eliminado');
    } catch (error) {
        console.log(error);
    }
};

/**
 * Download a file
 */
exports.download = async (req, res, next) => {
    const { archivo } = req.params;
    // Get link
    const link = await Enlaces.findOne({ name: archivo });

    const file = __dirname + '/../uploads/' + archivo;

    res.download(file);

    const { downloads, name } = link;

    if (downloads === 1) {
        // Delete file
        req.file = name;
        await Enlaces.findOneAndRemove(link.id);

        next();
    } else {
        link.downloads--;
        await link.save();
    }
};
