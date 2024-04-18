import { IUser } from "./user.model";

export interface IComment {
    _id: string,
    body: string,
    date: string,
    article: string,
    user: IUser
}