import { Schema, model } from 'mongoose';
;
const postSchema = new Schema({
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
const postModel = model('Post', postSchema);
export default postModel;
