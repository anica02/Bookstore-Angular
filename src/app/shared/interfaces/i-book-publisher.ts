export interface IBookPublisher {
    id:number,
    numberOfPages:number,
    bookCover:string,
    bookFormat:string,
    bookWritingSystem:string,
    year:number,
    publisherId:number,
    publisherName: string,
    price:number,
    discount?:IDiscount,
    image:IImage
}

export interface IImage{

    id:number,
    path:string,
    size:number
}

export interface IDiscount{

    id:number,
    discountPercentage:number,
    startsFrom:Date,
    endsAt:Date
}
