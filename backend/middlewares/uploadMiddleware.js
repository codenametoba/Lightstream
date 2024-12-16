import multer from 'multer';
import path from 'path';

// Configure Multer for temporary file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Temporary storage in 'uploads' directory
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName); // Add timestamp for unique filenames
  },
});
const fileFilter = (req, file, cb) => {
    console.log('File Properties:', {
        originalname: file.originalname,
        mimetype: file.mimetype,
      });
    // Allowed extensions
    const fileTypes = /mp4|avi|mov/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
  
    if (extname && mimetype) {
      cb(null, true); // Accept file
    } else {
      cb(new Error('Only video files are allowed!'), false); // Reject file
    }
  };
  

const upload = multer({ storage, 
    fileFilter,
    limits: { fileSize: 50 * 1024 * 1024 },
});

export default upload;
