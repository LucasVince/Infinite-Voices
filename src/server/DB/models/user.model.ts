import {Document, Schema, model} from 'mongoose';
interface IUser extends Document {
    username: string;
    email: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true}
})

const userModel = model('User', userSchema);

export default userModel;