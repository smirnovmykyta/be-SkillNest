import { v2 as cloudinary } from 'cloudinary';

class CloudinaryStorage {
    _handleFile(req, file, cb) {
        const cloudinaryUpload = cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
            if (error) cb(error);

            cb(null, { result });
        });

        file.stream.pipe(cloudinaryUpload);
    }
}

export default CloudinaryStorage;
