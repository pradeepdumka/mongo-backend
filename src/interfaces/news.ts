import { Document } from "mongoose";
interface Source extends Document{
    id:string;
    name:string
}

export interface News extends Document {
    source: Source;
    author: string;
    title: string;
    description: number;
    url: string;
    urlToImage: string;
    publishedAt: Date;
    content:string
    createdOn?: Date;
    updatedOn?: Date;
}

