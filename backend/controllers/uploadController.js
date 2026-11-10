import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

// Configure S3 Client
const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

// Configure Multer with memory storage (we will buffer it to memory then send to S3)
const storage = multer.memoryStorage();
export const upload = multer({ 
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit to support both images and videos
});

export const uploadToS3 = async (req, res) => {
  try {
    const file = req.file || (req.files && (req.files[0] || req.files.image?.[0] || req.files.video?.[0] || req.files.media?.[0]));
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    let fileName = `${crypto.randomBytes(16).toString('hex')}`;
    let processedBuffer = file.buffer;
    let mimeType = file.mimetype || 'application/octet-stream';

    // Keep original file extension
    const fileExtension = path.extname(file.originalname) || '.jpg';
    fileName = `${fileName}${fileExtension}`;

    const params = {
      Bucket: process.env.R2_BUCKET_NAME,
      Key: `products/${fileName}`,
      Body: processedBuffer,
      ContentType: mimeType,
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    const fileUrl = `${process.env.R2_PUBLIC_URL}/products/${fileName}`;

    res.status(200).json({ 
      url: fileUrl, 
      isVideo: Boolean(file.mimetype && file.mimetype.startsWith('video/')),
      message: 'Upload successful' 
    });
  } catch (error) {
    console.error('Error uploading to S3:', error);
    res.status(500).json({ message: 'Error uploading file to S3', error: error.message });
  }
};
