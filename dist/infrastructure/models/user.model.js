import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    bio: { type: String, required: false, default: null },
    posts: { type: Number, required: true, default: 0 },
    status: { type: String, required: true, default: 'online' },
    temporaryMessage: { type: String, required: false, default: null },
    createdAt: { type: Date, required: true, default: new Date() },
    avatar: { type: String, required: false, default: null },
});
const userModel = model('User', userSchema);
export default userModel;
