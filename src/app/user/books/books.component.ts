import { Component, OnInit, ViewChild } from '@angular/core';
import { GenreService } from '../../shared/services/genre.service';
import { IGenre } from '../../shared/interfaces/i-genre';
import { IBook } from '../../shared/interfaces/i-book';
import { BooksService } from '../../shared/services/books.service';
import { MatSelectionListChange } from '@angular/material/list';
import { UntypedFormBuilder } from '@angular/forms';
import { IPublisher } from '../../shared/interfaces/i-publisher';
import { MatPaginator } from '@angular/material/paginator';
import {merge, of} from "rxjs";
import { startWith, switchMap } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],

})
export class BooksComponent implements OnInit {

 
  bookGenres!:object[];
  books!:IBook[];
  bookCount!:number;
  allGenres!:IGenre[];
  bookSearch:any="";
  secondPanelOpenState: boolean = false;
 
  pageSize=8;
  bookLength!:number;


  constructor(
    private genreService:GenreService,
    private bookService:BooksService,
    private formBuilder: UntypedFormBuilder
  ) { }
  
  ngOnInit(): void {
   
    this.genreService.getGenres().subscribe({
      next:data=>{
        this.allGenres=data;
      }
    })
    
    this.getAllBooks();
     
   
  }

  genreForm = this.formBuilder.group({
    selectedTech: ''
  });

  onListSelectionChange(ob: MatSelectionListChange) {
    if(ob.source.selectedOptions.selected.length==0){
      this.getAllBooks();
      
    }
    else{
      this.bookGenres=this.genreForm.get('selectedTech')?.value;
      this.bookService.getBooksByGenres(this.bookGenres as IGenre[]).subscribe({
        next: data => {
         
          if(data.length==0){

            this.bookCount=0;

          }else{
            this.books=data;
            this.bookCount=this.books.length;
          }
        },
        error: err =>{
          console.log(err)
        }
      })
     
    }
    
  }

  getAllBooks():void{
   
    this.bookService.getBooksDesec().subscribe({
      next: data => {
       this.books=data;
       this.bookCount=data.length;
       this.bookLength=data.length;
      },
      error: err =>{
        console.log(err)
        
      }
    })

    


  }


  searchChange(event:any):void{
    this.bookSearch=event?.target.value;
    
    this.bookService.getBooksByName(event?.target.value).subscribe({
      next: data => {
        this.books=data;
        this.bookCount=data.length;
       },
       error: err =>{
         console.log(err)
         
       }
    })
   
  }

  clearSearch():void{
    this.bookSearch="";
    this.getAllBooks();
  }
  

  onPageChange(event: any) {
  
    event.pageIndex++;
    this.bookService.loadData(event.pageIndex, event.pageSize).subscribe({
      next: data => {
       this.books=data;
    
      },
      error: err =>{
        console.log(err)
        
      }
    })
    console.log(event.pageSize, event.pageIndex)
  }
  
  
 
  
}




