import fs from 'fs';
import { uploadToCloudinary } from '../utils/cloudinaryUtils.js';
import Movie from '../models/movieModel.js';

export const uploadMovie = async (req, res) => {
  const { title, description } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: 'Movie file is required.' });
  }

  try {
    // Upload file to Cloudinary
    const result = await uploadToCloudinary(req.file.path);

    // Remove the temporary local file
    fs.unlinkSync(req.file.path);

    // Save metadata to the database
    const newMovie = new Movie({
      title,
      description,
      fileUrl: result.secure_url,
      publicId: result.public_id,
      uploadedBy: req.user?.id || null, // Optional user association
    });

    await newMovie.save();
    res.status(201).json({ message: 'Movie uploaded successfully.', movie: newMovie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload movie.' });
  }
};


// Implement video streaming for uploaded files using Cloudinary's URL (secure_url).
// Add authentication for associating uploads with specific users.
// Clean up your project (e.g., delete unused imports or dependencies).
