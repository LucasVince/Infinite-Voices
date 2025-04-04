import postModel from '../DB/models/post.model';
import userModel from '../DB/models/user.model';
export const getPosts = async (req, res) => {
    const { currentPage = 0 } = req.query;
    try {
        const posts = await postModel.find({})
            .skip(10 * Number(currentPage))
            .limit(10)
            .populate('author')
            .exec();
        res.status(200).json({ posts });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching posts' });
    }
};
export const createPost = async (req, res) => {
    const { title, message, user, tags } = req.body;
    try {
        const author = user._id;
        if (!author)
            res.status(404).json({ message: 'User not found' });
        const post = await postModel.create({ title, content: message, author, tags: tags || [] });
        await userModel.findByIdAndUpdate(author, { $inc: { posts: 1 } }, { new: true, runValidators: true }).exec();
        res.status(200).json({ post });
    }
    catch (err) {
        res.status(500).json({ message: 'Error creating post' });
    }
};
