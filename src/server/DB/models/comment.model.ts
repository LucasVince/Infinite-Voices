import { Document, Schema, model, Types } from 'mongoose';

interface IComment extends Document {
    commentContent: string;
    postId: Types.ObjectId;
    author: Types.ObjectId;
}

const commentSchema = new Schema<IComment>({
    commentContent: {
        type: String,
        required: true
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const commentModel = model<IComment>('Comment', commentSchema);

export default commentModel;