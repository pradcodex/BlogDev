const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;
const jwt = require('jsonwebtoken')
require("dotenv").config({ path: "./config.env" });

// Cloudinary equivalent to AWS S3
// AWS S3: const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3")
// Cloudinary equivalent:
const { v2: cloudinary } = require("cloudinary");
const upload = require("./cloudinaryConfig"); // Multer middleware for handling image uploads

// Configure Cloudinary (equivalent to S3Client)
// Note: This is optional since Cloudinary auto-configures from environment variables
// (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET)
// but explicit config is recommended for clarity and control
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary methods (equivalent to AWS S3 Commands):
// - cloudinary.uploader.upload() → PutObjectCommand (upload file)
// - cloudinary.api.resource() → GetObjectCommand (get file info/URL)
// - cloudinary.uploader.destroy() → DeleteObjectCommand (delete file)

let cloudinaryRoutes = express.Router();

// Retreive One
cloudinaryRoutes.route("/images/:id").get(verifyToken, async (request, response) => {
    // Cloudinary equivalent to GetObjectCommand
    try {
        // Decode URL encoding (e.g., %2F becomes / for folder paths like "mern_uploads/lknt18qinmofbxvjx6dw")
        const publicId = decodeURIComponent(request.params.id);
        const data = await cloudinary.api.resource(publicId);
        response.json(data);
    } catch (error) {
        console.error("Error fetching image from Cloudinary:", error);
        response.status(404).json({ 
            message: "Image not found", 
            error: error.message,
            attempted_public_id: request.params.id 
        });
    }
});

// Create One (Upload Image)

// Cloudinary equivalent to AWS S3 PutObjectCommand
// Using multer middleware from cloudinaryConfig.js to handle file uploads
// When using multer with CloudinaryStorage, file is automatically uploaded to Cloudinary
// The result is available in request.file with Cloudinary info (url, public_id, etc.)
cloudinaryRoutes.route("/images").post(verifyToken, upload.single('image'), async (request, response) => {
    // After multer middleware, the file is already uploaded to Cloudinary
    // request.file contains the Cloudinary response with url, public_id, etc.
    if (!request.file) {
        return response.status(400).json({ message: "No image file provided" });
    }
    
    // multer-storage-cloudinary merges Cloudinary upload result into request.file
    // It contains: public_id, url, secure_url, format, width, height, etc.
    // Also contains multer fields: path, filename, originalname, mimetype, size
    const cloudinaryResponse = {
        public_id: request.file.public_id || request.file.filename, // public_id or fallback to filename
        url: request.file.url || request.file.path, // Cloudinary URL or fallback to path
        secure_url: request.file.secure_url || request.file.url || request.file.path,
        format: request.file.format,
        width: request.file.width,
        height: request.file.height,
        originalname: request.file.originalname,
        mimetype: request.file.mimetype,
        size: request.file.size
    };
    
    // Return in same format as direct Cloudinary upload response
    response.json(cloudinaryResponse);
});


// Delete One
// cloudinaryRoutes.route("/images/:id").delete(verifyToken, async (request, response) => {
//     // Cloudinary equivalent to DeleteObjectCommand
//     const data = await cloudinary.uploader.destroy(request.params.id);
//     response.json(data);
// });

function verifyToken(request, response, next) {
    const authHeaders = request.headers["authorization"]
    const token = authHeaders && authHeaders.split(' ')[1]
    if (!token) {
        return response.status(401).json({ message: "Authentication token is missing" })
    }

    jwt.verify(token, process.env.SECRETKEY, (error, user) => {
        if (error) {
            return response.status(403).json({ message: "Authentication token is missing" })
        }
        // request.body.user = user
        request.user = user
        next()
    })
}

module.exports = cloudinaryRoutes;
