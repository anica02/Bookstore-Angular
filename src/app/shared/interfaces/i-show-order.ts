export interface IShowOrder {
    id:number,
    address:string,
    paymentMethod:string,
    deliveryMethod:string,
    createdAt:Date,
    isActive:boolean,
    orderItems: IOrderItemShow,
  
}

export interface IOrderItemShow{
    id:number,
    bookPublisherId:number,
    name:string,
    image:string
    price:number,
    quantity:number,
    total:number
   
}


