//create table for story
import mongoose from "mongoose";


const ReelsSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    video: [{type: String, required: true}],
    
}, {
    timestamps: true
});

const Reels = mongoose.model('reelis', ReelsSchema);
export default Reels;