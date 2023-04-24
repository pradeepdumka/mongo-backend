import { News } from '../interfaces/news';
import mongoose, { Schema, Document } from 'mongoose';

const LatestNews: Schema = new Schema({
    source: {
        id:{type:String ,name:String}
    },
    author: { type: String },
    title: { type: String},
   // title: { type: String, required: true, unique: true, index: true },
    description: { type: String}, // 1: Admin, 2: Partner
    url: { type: String}, 
    urlToImage: { type: String}, 
    content: { type: String}, 
   
    publishedAt: { type: Date,  default: Date.now() },
    createdOn: { type: Date,  default: Date.now() },
    updatedOn: { type: Date,  default: Date.now() }
});

export default mongoose.model<News & Document>('LatestNews', LatestNews);
