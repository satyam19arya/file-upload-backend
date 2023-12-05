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
    } catch(error){
        res.status(500).send({
            message: 'Error uploading file',
        });
        console.error(error);
    }
}

const imageUpload = async (req, res) => {
    try{
        const {name, tags, email} = req.body;
        const file = req.files.file;

        if(!name || !tags || !email) {
            return res.status(400).send({
                message: 'Please fill all fields'
            });
        }

        // Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        if(!supportedTypes.includes(fileType)) {
            return res.status(400).send({
                message: 'File type not supported'
            });
        }

        if(file.size > 1024 * 1024 * 5) {
            return res.status(400).send({
                message: 'File size too large'
            });
        }

        // Upload to cloudinary
        const uploadedImage = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: 'FileUpload',           
        });

        // Save to database
        const newFile = new File({
            name,
            tags,
            email,
            imageUrl: uploadedImage.secure_url,
        });

        await newFile.save();

        res.status(200).json({
            message: 'Image uploaded successfully',
            image: uploadedImage.secure_url
        });

    } catch(error){
        res.status(500).send({
            message: 'Error uploading image',
        });
        console.error(error);
    }
}

const videoUpload = async (req, res) => {
    try{
        const {name, tags, email} = req.body;
        const file = req.files.file;

        if(!name || !tags || !email) {
            return res.status(400).send({
                message: 'Please fill all fields'
            });
        }

        // Validation
        const supportedTypes = ["mp4", "mov", "wmv", "flv", "avi", "webm"];
        const fileType = file.name.split('.')[1].toLowerCase();
        if(!supportedTypes.includes(fileType)) {
            return res.status(400).send({
                message: 'File type not supported'
            });
        }

        if(file.size > 1024 * 1024 * 20) {
            return res.status(400).send({
                message: 'File size too large'
            });
        }

        // Upload to cloudinary
        const uploadedVideo = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: 'FileUpload', 
            resource_type: "video",           
        });

        // Save to database
        const newFile = new File({
            name,
            tags,
            email,
            videoUrl: uploadedVideo.secure_url,
        });

        await newFile.save();

        res.status(200).json({
            message: 'Video uploaded successfully',
            video: uploadedVideo.secure_url
        });

    } catch(error){
        res.status(500).send({
            message: 'Error uploading video',
        });
        console.error(error);
    }
}

const imageSizeReducer = async (req, res) => {
    try{
        const {name, tags, email} = req.body;
        const file = req.files.file;

        if(!name || !tags || !email) {
            return res.status(400).send({
                message: 'Please fill all fields'
            });
        }

        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        if(!supportedTypes.includes(fileType)) {
            return res.status(400).send({
                message: 'File type not supported'
            });
        }

        // Upload to cloudinary
        const uploadedImage = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: 'FileUpload',
            transformation: [
                {width: 500, height: 500, crop: "limit"}
            ],
            quality: "40",
            resource_type: "image",       
        });

        // Save to database
        const newFile = new File({
            name,
            tags,
            email,
            imageUrl: uploadedImage.secure_url,
        });

        await newFile.save();

        res.status(200).json({
            message: 'Image uploaded successfully',
            image: uploadedImage.secure_url
        });

    } catch(error){
        res.status(500).send({
            message: 'Error reducing image size',
        });
        console.error(error);
    }
}

module.exports = {
    localFileUpload,
    imageUpload,
    videoUpload,
    imageSizeReducer
};