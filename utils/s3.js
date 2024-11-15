const { PutObjectCommand } = require('@aws-sdk/client-s3');
const s3Client = require('../config/s3Client');
const bucketName = process.env.AWS_BUCKET_NAME;

const uploadFile = async (file, folder = 'uploads') => {
    const params = {
        Bucket: bucketName,
        Key: `${folder}/${Date.now()}_${file.originalname}`, // Unique file name
        Body: file.buffer, // Use the buffer from the in-memory file
        ContentType: file.mimetype, // Preserve the file's MIME type
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

module.exports = {
    uploadFile,
};
