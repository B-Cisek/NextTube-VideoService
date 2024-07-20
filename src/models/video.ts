import mongoose, { Schema } from 'mongoose';

export const videoSchema = new Schema(
    {
        name: { type: String, required: true },
        type: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

export const Video = mongoose.model('Video', videoSchema);
