//create table for story
import mongoose from "mongoose";


const storySchema = new mongoose.Schema({
    userId: {type: String, required: true},
    image: {type: String, required: true},
    
}, {
    timestamps: true
});

const Story = mongoose.model('Stories', storySchema);
export default Story;