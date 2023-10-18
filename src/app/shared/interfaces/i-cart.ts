export interface ICart {
    cartItems: ICartItem[]
}

export interface ICartItem{

    bookPublisherId:number,
    quantity:number
}
