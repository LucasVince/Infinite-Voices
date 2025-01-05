import { Document, Schema, model } from 'mongoose';

interface IPost extends Document {
    
};

const postSchema = new Schema<IPost>({

});

const postModel = model('Post', postSchema);

export default postModel;