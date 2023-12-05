const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const fileSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    tags: {
        type: String
    },
    email: {
        type: String
    },
});

// post middleware
fileSchema.post('save', async function(doc) {
    console.log(doc);
    try{
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            }
        });

        await transporter.sendMail({
            from: 'Satyam Arya',
            to: doc.email,
            subject: 'File uploaded on server',
            html: `File uploaded successfully! <p> View it here: <a href="${doc.imageUrl}">${doc.imageUrl}</a> </p>`,
        });

    } catch(error) {
        console.error(error);
    }
});

module.exports = mongoose.model('file', fileSchema);