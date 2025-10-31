const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config({ path: './config.env' });

// Connect to your Cloudinary account using .env credentials
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Tell multer to upload files directly to Cloudinary
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'mern_uploads', // Folder name inside Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});

const upload = multer({ storage });

module.exports = upload;
