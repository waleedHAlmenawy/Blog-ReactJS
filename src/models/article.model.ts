import { IUser } from "./user.model";

export interface IArticle {
    _id: string,
    title: string,
    body: string,
    image: string,
    date: string,
    user: IUser
}