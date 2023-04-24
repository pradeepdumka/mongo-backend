import mongoose, { Schema, Document } from 'mongoose';
import { User } from '../interfaces/user';
const Users: Schema = new Schema({

    username: { type: String },
    email: { type: String,required: true, unique: true, index: true},
    password: { type: String},  
    createdOn: { type: Date,   default: Date.now() },
    updatedOn: { type: Date, default: Date.now() }
});

export default mongoose.model<User & Document>('Users', Users);
