const s3 = require('../config/aws');
const bucketName = process.env.AWS_BUCKET_NAME;

// Upload a file to S3
const uploadFile = async (file, folder = 'uploads') => {
    const params = {
        Bucket: bucketName,
        Key: `${folder}/${file.originalname}`, // File path in S3
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read', // Make the file publicly accessible
    };

    try {
        const data = await s3.upload(params).promise();
        return data.Location; // Public URL of the file
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
        await s3.deleteObject(params).promise();
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
