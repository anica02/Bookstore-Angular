import { IBookPublisher } from "./i-book-publisher"
import { IAuthor } from "./i-author"
import { IGenre } from "./i-genre"
export interface IBook {
    id: number,
    name: string,
    description:string,
    code:number,
    createdAt:Date,
    modifiedAt:Date,
    modifiedBy: string,
    deletedAt:Date,
    deletedBy:string,
    isActive:boolean
    bookAuthors: IAuthor[],
    bookPublisher: IBookPublisher,
    bookGenres: IGenre[]

}
