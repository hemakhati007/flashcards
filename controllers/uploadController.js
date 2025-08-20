

const User = require("../Models/User");

// Upload Profile Image Controller
const uploadProfileImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        const userId = req.user.id; // from fetchuser middleware
        const imageUrl = `/uploads/${req.file.filename}`;

        // Update user profile with image path
        const user = await User.findByIdAndUpdate(
            userId,
            { image: imageUrl }
        );

        res.json({ success: true, user });
    } catch (err) {
        console.error("Upload error:", err);
        res.status(500).json({ success: false, message: "Upload failed" });
    }
};

module.exports = { uploadProfileImage };

