import { Component, Input , OnInit} from '@angular/core';
import { IBook} from '../../interfaces/i-book';
import { ActivatedRoute, Router } from '@angular/router';

import { IAuthor } from '../../interfaces/i-author';
import { IBookPublisher } from '../../interfaces/i-book-publisher';
import { ListingPipe } from '../../pipes/listing.pipe';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { IAuth } from 'src/app/login/interfaces/i-auth';
import { ICart, ICartItem } from '../../interfaces/i-cart';
import { CartService } from 'src/app/user/cart/services/cart.service';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
  providers:[DatePipe]
})
export class BookCardComponent implements OnInit{

 
  @Input () book!: IBook;
  @Input() bookImgClass!:string;
  @Input() bookDiscountClass!:string;
  @Input() bookBtnViewClass!:string;
  @Input() bookBtnCartClass!:string;

  authors:IAuthor[]=[];
 
  bookAuthors!: string;
  elementHidden: string="hidden";
  elementOpacity: string="";
  
  lastBookPublisher!: IBookPublisher;

  user!:IAuth;
  cart!:ICart;
 

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private _snackBar:MatSnackBar,
    private datePipe: DatePipe,
    private authService: AuthService
    
  ){

   
  }
 
   date!:any;
 

  ngOnInit(): void {
   
      
  }

  onMouseOver(): void{
    this.elementHidden="show";
    this.elementOpacity="objOpacity";
  }

  onMouseLeave(): void{
    this.elementHidden="hidden";
    this.elementOpacity="";
  }

  showBook(bookId: number): void{
    this.router.navigate(['../bookDetails', bookId], { relativeTo: this.activatedRoute})
  }

  addToCart(id: number) {
   
    const user = this.authService.getUser();
    if (user == null) {
      this._snackBar.open('You need to login to add to cart', 'Close');

    } else {
     
      const newItem: ICartItem = {
        bookPublisherId: id,
        quantity: 1
      };
      
      const items : ICartItem[]=[];
      items.push(newItem);

      this.cartService.createCart(items).subscribe(
        (response) => {
      
          console.log('Successful:', response);
          this._snackBar.open('Book added to cart', 'Close');
          console.log(items);
        },
        (error) => {
          
          this._snackBar.open( error.error[0].propertyName + " : "+ error.error[0].errorMessage , "Close");
          console.error('Failed:', error);
        }
      );
    }
  }
 

  
        

 

  

}
