import express from 'express'
import Post from '../models/postModel.js';
import User from '../models/userModel.js';

const PostRouter = express.Router();

//add post
PostRouter.post('/add', async(req, res) => {
    const newPost = new Post(req.body);
    try {

        const savedPost = await newPost.save();
        res.status(200).json(savedPost);

    } catch(error) {
        res.status(500).json(error);
    }
});

//get a post
PostRouter.get('/:id', async(req, res) => {
    try {

        const post = await Post.findById(req.params.id);
        res.status(200).json(post);

    } catch(error) {
        res.status(500).json(error);
    }
});

//get all post for current user
PostRouter.get('/account/:username', async(req, res) => {
    try {

        const user = await User.findOne({username: req.params.username});
        const posts = await Post.find({userId: user._id});
        res.status(200).json(posts);

    } catch(error) {
        res.status(500).json(error);
    }
});

//get all posts for my friends and my posts
PostRouter.get('/all/:userId', async(req, res) => {
    try {

        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({userId: currentUser._id});
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({userId: friendId})
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts));

    } catch(error) {
        res.status(500).json(error);
    }
});

//like / dislike a post
PostRouter.put('/:id/like', async(req, res) => {
    try {

        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)) {
            await post.updateOne({$push: {likes: req.body.userId}});
            res.status(200).json('The post has been liked');
        } else {
            await post.updateOne({$pull: {likes: req.body.userId}});
            res.status(200).json('The post has been disliked');
        }

    } catch(error) {
        res.status(500).json(error);
    }
});

export default PostRouter;