import multer from "multer";
import CloudinaryStorage from "../utils/cloudinary/cloudinary.js";

const ALLOWED_EXT = ['jpg', 'jpeg', 'webp', 'avif', 'png', 'mp4', 'mov', 'avi', 'mkv'];
const ALLOWED_SIZE = 1_048_576 * 10; // 10mb

const storage = new CloudinaryStorage();

const fileFilter = (req, file, cb) => {
    const fileExt = file.mimetype.split('/')[1];

    if (!ALLOWED_EXT.includes(fileExt)) {
        const err = new Error(`Wrong file type`);
        err.statusCode = 400;
        cb(err);
    } else {
        cb(null, true);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: ALLOWED_SIZE }
}).array('files', 10);

export const handleFileUpload = (req, res, next) => {
    console.log("1111")
    upload(req, res, (err) => {
        if (err) return res.status(400).json({error: err.message});

        req.uploadedFiles = req.files?.map(file => ({
            url: file.result.secure_url,
            format: file.mimetype.split('/')[0]
        })) || [];

        next();
    });
};
