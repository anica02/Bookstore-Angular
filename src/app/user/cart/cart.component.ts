import {AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { IUserCart } from './interfaces/i-user-cart';
import { BooksService } from '../../shared/services/books.service';
import { IBook } from '../../shared/interfaces/i-book';
import { ICart } from '../../shared/interfaces/i-cart';
import { CartService } from './services/cart.service';
import { ICarItemDb, ICarItemDbUpdate, ICartDatabase, ICartDatabaseUpdate } from './interfaces/i-cart-database';
import { finalize, forkJoin } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  
  userCart: IUserCart[]= [];
  allBooks!: IBook[];
  cart!:ICartDatabase;
  cartIsEmpty: boolean = true;
  displayedColumns: string[] = [ 'name', 'image', 'price', 'quantity','total', 'edit', 'delete'];
  dataSource!: any;
  totalForAll:number=0;
  


  constructor(private bookService: BooksService, 
    private cartService:CartService, 
     private _snackBar:MatSnackBar,
      private cdr: ChangeDetectorRef, 
      private router: Router,
       private ngZone: NgZone,
       public dialog: MatDialog) { }

  ngOnInit(): void {

    forkJoin([
      this.bookService.getBooks(),
      this.cartService.getUserCar()
    ]).subscribe(([books, cart]) => {
      this.allBooks = books;
      this.cart = cart || { cartItems: [] }; 
  
      console.log(this.allBooks);
      console.log(this.cart);
      if (this.cart.cartItems.length > 0) {
        this.getCartItems(this.allBooks, this.cart);
      } else {
        this.cartIsEmpty = true;
      }

    }, (error) => {
      console.error('Error fetching data', error);
      this.cartIsEmpty = true;
    });


  }

  getBooks():void{

    this.bookService.getBooks().subscribe({
      next: data => {
       this.allBooks=data;
       console.log(this.allBooks);
    
      },
      error: err =>{
        console.log(err) 
      }
    })
  }
  getCart():void{
    this.cartService.getUserCar().subscribe({
      next: data => {
       this.cart= data;

       
       console.log(this.cart);
      },
      error: err =>{
        this.cartIsEmpty = true;
        console.log(err) 

      
      }
    })  
   
  }
  getCartItems(books: IBook[], cart: ICartDatabase): void{
    
        for(let bookC of cart.cartItems){
          for(let bookA of books){

           if(bookC.bookPublisherId == bookA.bookPublisher.id){

              const newItem: IUserCart= {
                id:bookC.id,
                name: bookA.name,
                image: bookA.bookPublisher.image.path,
                price: bookA.bookPublisher.discount? bookA.bookPublisher.price - (bookA.bookPublisher.price * bookA.bookPublisher.discount.discountPercentage / 100) : bookA.bookPublisher.price,
                quantity: bookC.quantity,
                total: bookA.bookPublisher.discount? parseFloat((bookC.quantity * (bookA.bookPublisher.price - (bookA.bookPublisher.price * bookA.bookPublisher.discount.discountPercentage / 100))).toFixed(2)) : parseFloat((bookC.quantity * bookA.bookPublisher.price).toFixed(2)),
                bookPublisherId:bookC.bookPublisherId
              };
             
            
              this.userCart.push(newItem);
              this.totalForAll=this.userCart.map((item) => item.price * item.quantity).reduce((acc, value) => acc + value, 0);
              this.totalForAll = parseFloat(this.totalForAll.toFixed(2));
           }
        }
      }
    console.log(this.userCart);
  
    this.cartIsEmpty = this.userCart.length === 0;
    this.dataSource= new MatTableDataSource<IUserCart>(this.userCart);
    
    this.cdr.detectChanges();
 
  }
  
  editCart(id:number):void{
    this.cdr.detectChanges();
    const itemsDb: ICarItemDbUpdate[]=[];

    for(let items of this.userCart){
      const newItem: ICarItemDbUpdate= {
         
           bookPublisherId: items.bookPublisherId,
           quantity: items.quantity
      };
      items.total=items.price* items.quantity;
  
      itemsDb.push(newItem);
    }


    const newCart: ICartDatabaseUpdate= {
      cartItems: itemsDb
    };
    this.dataSource=new MatTableDataSource<IUserCart>(this.userCart);
    this.totalForAll = this.userCart.map((item) => item.price * item.quantity).reduce((acc, value) => acc + value, 0);
    this.totalForAll = parseFloat(this.totalForAll.toFixed(2));
    this.cdr.detectChanges();
    
    
    
    this.cartService.editUserCart(newCart, this.cart.id).subscribe(
       (response) => {
         console.log('Successful:', response);
         this._snackBar.open('Item updated', 'Close');

        

      
       },
       (error) => {
         console.error('Failed:', error);
         this._snackBar.open( error.error[0].propertyName + " : "+ error.error[0].errorMessage , "Close");
       }
     );
    

  }
   
  

  deleteCart(id: number):void{
    
    this.userCart = this.userCart.filter(item => item.id !== id);
    
   
    const itemsDb: ICarItemDbUpdate[] = this.userCart.map(item => ({
      bookPublisherId: item.bookPublisherId,
      quantity: item.quantity
    }));


    const newCart: ICartDatabaseUpdate= {
      cartItems: itemsDb
    };

    this.cartService.editUserCart(newCart, this.cart.id)
    .pipe(
      finalize(() => {
        this.ngZone.run(() => {
          this.dataSource = new MatTableDataSource<IUserCart>(this.userCart);
          this.totalForAll=this.userCart.map((t: { price: any; }) => t.price).reduce((acc: any, value: any) => acc + value, 0);
     
          this.cdr.detectChanges();

          if (this.userCart.length > 0) {
            this.cartIsEmpty = false;
          } else {
            this.cartIsEmpty = true;
          }
        });
      })
    )
    .subscribe(
      (response) => {
        console.log('Successful:', response);
        this._snackBar.open('Item deleted', 'Close');
      },
      (error) => {
        console.error('Failed:', error);
        this._snackBar.open(error.error[0].propertyName + " : " + error.error[0].errorMessage, "Close");
      }
    );
   
  }

  openConfirmationDialog(id:number): void {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteCart(id);
      } 
    });
  }
  goToOrderForm():void{
    this.router.navigate(['/create-order']);
  }
  
  
}
