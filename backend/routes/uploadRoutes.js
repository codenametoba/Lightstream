import express from 'express';
// import multer from 'multer';
import upload from '../middlewares/uploadMiddleware.js';
import { uploadToCloudinary } from '../utils/cloudinaryUtils.js';


const router = express.Router();
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, './uploads'); // Temporary storage
//     },
//     filename: (req, file, cb) => {
//       cb(null, `${Date.now()}-${file.originalname}`);
//     },
//   });
  
  // const upload = multer({ storage });

router.post('/upload', upload.single('video'), async (req, res) => {
  try {
    const result = await uploadToCloudinary(req.file.path); // Upload file to Cloudinary

    res.status(200).json({
      success: true,
      message: 'File uploaded successfully!',
      data: {
        secure_url: result.secure_url,
        public_id: result.public_id,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'File upload failed. Please try again.',
      error: error.message,
    });
  }
});

export default router;
