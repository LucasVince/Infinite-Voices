import { Document, Schema, model } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  bio: string;
  posts: number;
  status: string;
  temporaryMessage: string;
  createdAt: Date;
  avatar: string;
}

const userSchema = new Schema<IUser>({
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

const userModel = model<IUser>('User', userSchema);

export default userModel;
