const AWS = require('aws-sdk');

// Configure AWS SDK
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Set these in your .env file
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-south-1' // Replace with your bucket's region
});

// Create an S3 instance
const s3 = new AWS.S3();

module.exports = s3;
