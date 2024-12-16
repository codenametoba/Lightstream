import cloudinary from "../config/cloudinaryConfig.js";
import fs from 'fs'

export async function uploadToCloudinary(filePath) {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        resource_type: 'video',
        folder: 'movies',
      });
  
      fs.unlinkSync(filePath); // Always clean up temporary files
  
      if (!result) {
        console.log('File upload failed. Please try again.');
        return null; // Return null if upload failed
      } else {
        console.log('File uploaded successfully:', result.secure_url);
        return result; // Return successful upload details
      }
    } catch (error) {
      fs.unlinkSync(filePath); // Ensure cleanup even if an error occurs
      console.error('Error uploading to Cloudinary:', error.message);
      throw new Error('Cloudinary upload failed'); // Propagate the error
    }
  }
  