"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Track = exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 8;
const userSchema = new mongoose_1.Schema({
    name: String,
    user: String,
    email: String,
    password: String,
    bio: String,
    profile_pic_path: String,
});
const trackSchema = new mongoose_1.Schema({
    uploaded_by: String,
    path: String,
    title: String,
    size: Number,
    date: Number,
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.User = User;
const Track = (0, mongoose_1.model)('Track', trackSchema);
exports.Track = Track;
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt_1.default.hash(user.password, saltRounds);
    }
    next();
});
