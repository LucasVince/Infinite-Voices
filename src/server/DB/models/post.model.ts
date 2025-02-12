<<<<<<< HEAD
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

=======
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

>>>>>>> 8d1c0568f42a134326c3b122c6760b8719678014
export default postModel;