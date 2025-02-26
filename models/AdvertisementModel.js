import {model, Schema} from "mongoose";
import {expirationDate} from "../utils/advertisement/expirationDate.js";


const AdvertisementSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    media: [
        {
            type: String,
            default: "https://res.cloudinary.com/dm3bzm6cx/image/upload/default_logo.png"
        },
    ],
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    offer: {
        type: String,
        required: false
    },
    request: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true,
        index: true
    },
    isGroup: {
        type: Boolean,
        default: false
    },
    timeAvailability: [{
        type: Date
    }],
    expirationDate: {
        type: Date,
        default: expirationDate(),
    },
    lessonMode: {
        type: Boolean,
        enum: ['online', 'offline', 'both'],
        required: true
    },
    location: {
        type: String,
        required: false
    },
    active: {
        type: Boolean,
        default: true
    },
    languages: [{
        language: {
            type: String,
            required: true,
            trim: true
        },
        qualification: {
            type: String,
            enum: ['native', 'certified', 'fluent', 'intermediate', 'beginner'],
            required: true
        }
    }]
}, {timestamps: true});

AdvertisementSchema.pre('find', async function (next) {
    await this.model.updateMany(
        { expirationDate: { $lt: new Date() }, active: true },
        { $set: { active: false } }
    );
    next();
});

const AdvertisementModel = model('Advertisement', AdvertisementSchema);

export default AdvertisementModel;
