import express from 'express'
import Reels from '../models/reelsModel.js';

import User from '../models/userModel.js';

const ReelsRouter = express.Router();

//add post
ReelsRouter.post('/upload', async(req, res) => {
    const newReels = new Reels(req.body);
    try {

        const savedReels = await newReels.save();
        res.status(200).json(savedReels);

    } catch(error) {
        res.status(500).json(error);
    }
});

//get all story for my friends and my posts
ReelsRouter.get('/all/:userId', async(req, res) => {
    try {

        const currentUser = await User.findById(req.params.userId);
        const userReelis = await Reels.find({userId: currentUser._id});
        const friendReelis = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Reels.find({userId: friendId})
            })
        );
        res.status(200).json(userReelis.concat(...friendReelis));

    } catch(error) {
        res.status(500).json(error);
    }
});

export default ReelsRouter;