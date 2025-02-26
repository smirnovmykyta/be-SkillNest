import {model, Schema} from "mongoose";
import bcrypt from "bcrypt"
import {emailRegex, passwordRegex, phoneNumberRegex} from "../utils/validate/validation.js";


const UserSchema = new Schema({
    email: {
        type:String,
        required: [true, 'Please provide an email.'],
        unique: [true, 'Email already in use.'],
        lowercase: true,
        match: [emailRegex, 'Email not valid.']
    },
    password: {
        type: String,
        required: true,
        match: [
            passwordRegex,
            'Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.'
        ]
    },
    name: {
        type: String,
        required: [true, 'Please provide an name.'],
        trim: true,
    },
    surname: {
        type: String,
        required: [true, 'Please provide an surname.'],
        trim: true,
    },
    birthday: {
        type: Date,
    },
    phoneNumber: {
        type: String,
        match: [
            phoneNumberRegex,
            'Invalid phone number.'
        ]
    },
    address: {
        street: {
            type: String,
            trim: true,
        },
        houseNumber: {
            type: String,
            trim: true,
        },
        postalCode: {
            type: Number,
            min: [10000, "The zip code must have 5 digits."],
            max: [99999, "The postal code can have a maximum of 5 digits."],
        },
    },
    userAdvertisements: [
        {
            type: Schema.Types.ObjectId,
            ref: "Advertisement",
        },
    ],
    favoriteAdvertisements: [
        {
            type: Schema.Types.ObjectId,
            ref: "Advertisement",
        }
    ],
    profileImg: [
        {
            type: String,
            default: "https://res.cloudinary.com/dm3bzm6cx/image/upload/default_avatar.webp"
        },
    ],


},{timestamps: true});

UserSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
} );

const UserModel = model('User', UserSchema);

export default UserModel;
