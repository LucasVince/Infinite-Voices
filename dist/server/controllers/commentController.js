import commentModel from '../DB/models/comment.model';
export const getComments = async (req, res, next) => {
    const { postId } = req.query;
    try {
        const comments = await commentModel.find({ postId }).populate('author').exec();
        res.status(200).json({ comments });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching comments' });
    }
};
export const createComment = async (req, res) => {
    const { comment, postId, author } = req.body;
    try {
        const newComment = await commentModel.create({ commentContent: comment, postId, author });
        const populatedComment = await commentModel.findById(newComment._id).populate('author').exec();
        res.status(200).json({ populatedComment });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating comment' });
    }
};
