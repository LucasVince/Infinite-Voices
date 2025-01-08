import { Document, Schema, model, Types } from 'mongoose';

interface IPost extends Document {
    content: string;
    author: Types.ObjectId;
};

const postSchema = new Schema<IPost>({
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const postModel = model<IPost>('Post', postSchema);

export default postModel;