import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import multer from "multer";
import path from "path";
import fs from "fs";

connect();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `profile-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

// Middleware to handle file upload
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: any, res: any) {
  const uploadMiddleware = upload.single("profilePicture");

  uploadMiddleware(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: "File upload error" });
    }

    try {
      const userId = getDataFromToken(req);
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Get the path of the uploaded image
      const profilePictureUrl = `/uploads/${req.file.filename}`;

      // Update the user's profile picture URL
      user.profilePicture = profilePictureUrl;
      await user.save();

      return res.status(200).json({
        message: "Profile picture uploaded successfully",
        profilePictureUrl,
      });
    } catch (error) {
      return error;
    }
  });
}
