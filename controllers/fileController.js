const File = require('../models/File');
const cloudinary = require('cloudinary').v2;

const localFileUpload = async (req, res) => {
    try {
        const file = req.files.file;

        if(!file) {
            return res.status(400).send({
                message: 'Please upload a file'
            });
        }

        if(file.size > 1024 * 1024 * 5) {
            return res.status(400).send({
                message: 'File size too large'
            });
        }

        let path = `${__dirname}/files/${Date.now()}.${file.name.split('.')[1]}` // path to save file (server side)
        file.mv(path, async (err) => {
            if(err) {
                console.error(err);
                return res.status(500).send(err);
            }

            res.status(200).json({
                message: 'Local File uploaded successfully',
                filePath: path
            });
        })
    } catch (error) {
        res.status(500).send({
            message: 'Error uploading file',
        });
        console.error(error);
    }
}

module.exports = {
    localFileUpload
};