import { Component, OnInit } from '@angular/core';
import { IBook } from '../../shared/interfaces/i-book';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../../shared/services/books.service';

import { IAuthor } from '../../shared/interfaces/i-author';
import { GenreService } from '../../shared/services/genre.service';
import { IGenre } from '../../shared/interfaces/i-genre';
import { IPublisher } from '../../shared/interfaces/i-publisher';

import { ListingPipe } from '../../shared/pipes/listing.pipe';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from '../../shared/services/auth-service.service';
import { CartService } from '../cart/services/cart.service';
import { ICartItem } from '../../shared/interfaces/i-cart';
@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  bookId!: string | number;
  book!: IBook;
  authors!:IAuthor[];
  genres!:IGenre[];

  bookQuantity:number=1;
  descriptionSubstr:string="";
   visible!:string;
   
  constructor(
    private activatedRoute: ActivatedRoute,
    private bookService:BooksService,
    private _snackBar:MatSnackBar,
    private authService:AuthService,
    private cartService:CartService

  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.bookId = params.get("id")!;
      console.log(this.bookId)
      this.getBookById(Number(this.bookId))
    
    })
  }

  getBookById(id: number): void{
    this.bookService.getBook(id).subscribe({
      next: data => {
        this.book = data
        if(this.book.description.length<=296){
          this.descriptionSubstr=this.book.description;
          this.visible="hidden";
        }else{
          this.descriptionSubstr=this.book.description.substring(0,296)+"...";
          this.visible="show";
        }
       
      }
    })
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

 
  
  
  showFullDescription():void{
    this.descriptionSubstr=this.book.description;
  }
}
