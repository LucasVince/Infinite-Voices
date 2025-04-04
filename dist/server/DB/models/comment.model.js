import { Schema, model } from 'mongoose';
const commentSchema = new Schema({
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
const commentModel = model('Comment', commentSchema);
export default commentModel;
