export interface IGenre {
    id:number,
    name:string,
    parentId?:number,
    subgenres?:IGenre
}
 

