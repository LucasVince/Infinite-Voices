import { Document, Schema, model, Types } from 'mongoose';

interface IPost extends Document {   
    title: string,
    content: string,
    author: Types.ObjectId,
    tags: string[]
};

const postSchema = new Schema<IPost>({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: {
        type: [String],
        required: false
    }
});

const postModel = model<IPost>('Post', postSchema);

export default postModel;