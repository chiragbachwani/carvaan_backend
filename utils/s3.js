const { PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const s3Client = require('../config/S3Client');
const bucketName = process.env.AWS_BUCKET_NAME;

// Upload a file to S3
const uploadFile = async (file, folder = 'uploads') => {
    const params = {
        Bucket: bucketName,
        Key: `${folder}/${file.originalname}`, // File path in S3
        Body: file.buffer, // File content
        ContentType: file.mimetype, // File type
        ACL: 'public-read', // Publicly accessible
    };

    try {
        const command = new PutObjectCommand(params);
        await s3Client.send(command);
        return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
    } catch (err) {
        console.error('Error uploading to S3:', err);
        throw err;
    }
};

// Delete a file from S3
const deleteFile = async (fileKey) => {
    const params = {
        Bucket: bucketName,
        Key: fileKey, // File path in S3
    };

    try {
        const command = new DeleteObjectCommand(params);
        await s3Client.send(command);
        return { success: true };
    } catch (err) {
        console.error('Error deleting from S3:', err);
        throw err;
    }
};

module.exports = {
    uploadFile,
    deleteFile,
};
