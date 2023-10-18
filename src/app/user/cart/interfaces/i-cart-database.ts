export interface ICartDatabase {
  id:number,
  cartItems:ICarItemDb[]
}

export interface ICarItemDb{
    id:number,
    bookPublisherId:number,
    quantity:number
    
}


export interface ICartDatabaseUpdate {
 
  cartItems:ICarItemDbUpdate[]
}

export interface ICarItemDbUpdate{
  
    bookPublisherId:number,
    quantity:number
    
}

   