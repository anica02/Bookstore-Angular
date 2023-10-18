import { Component, OnInit } from '@angular/core';
import { ICarousel } from './interfaces/i-carousel';
import { IBook} from '../../shared/interfaces/i-book';
import { IBookRow } from './interfaces/i-book-row';
import { BooksService } from '../../shared/services/books.service';
import { tick } from '@angular/core/testing';
import { AuthService } from '../../shared/services/auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 

  booksForRow!: IBook[];

  newArrivals: IBook[]=[];
  
  rowBook1: IBookRow = {
    title:"New arrivals",
    books: []
  }

  rowBook2: IBookRow = {
    title:"We recommend",
    books: []
  }
  
  carouselItems: ICarousel[]=[
    {
      id:0,
      src:"../../assets/img/carousel4.jpg",
      alt:"Prva slika"
    },
    {
      id:1,
      src:"../../assets/img/carousel2.jpg",
      alt:"Druga slika"
    },{
      id:2,
      src:"../../assets/img/carousel1.jpg",
      alt:"Druga slika"
    }
  ];

  constructor(
    private bookService:BooksService, private authService: AuthService
  ) { }

  ngOnInit(): void {
    console.log(this.authService.getUser());
    this.bookService.getBooks().subscribe({
      next: data => {
       this.rowBook2.books=data;
      },
      error: err =>{
        console.log(err)
        
      }
    })
    this.bookService.getBooksDesec().subscribe({
      next: data => {
        this.rowBook1.books=data;
       },
       error: err =>{
         console.log(err)
         
       }
    })
  }
  
}
