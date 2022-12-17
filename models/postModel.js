//create table for post
import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    description: {type:String, required: true},
    image: {type: String},
    likes: {type: Array, default: []},
}, {
    timestamps: true
});

const Post = mongoose.model('Posts', postSchema);
export default Post;