import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IAuthor } from 'src/app/shared/interfaces/i-author';
import { IGenre } from 'src/app/shared/interfaces/i-genre';
import { IPublisher } from 'src/app/shared/interfaces/i-publisher';
import { AuthorsService } from 'src/app/shared/services/authors.service';
import { BooksService } from 'src/app/shared/services/books.service';
import { GenreService } from 'src/app/shared/services/genre.service';
import { PublisherService } from 'src/app/shared/services/publisher.service';
import { saveAs } from 'file-saver';
interface Select {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-boook-create',
  templateUrl: './boook-create.component.html',
  styleUrls: ['./boook-create.component.css']
})
export class BoookCreateComponent implements OnInit {

  allGenres!:IGenre[];
  allAuthors!:IAuthor[];
  allPublishers!:IPublisher[];
  file_list: Array<string> = [];
  file_store!: File;

  bookCovers: Select[]=[
    {value:'Softcover', viewValue:"Softcover"},
    {value:'Hardcover', viewValue:'Hardcover'}
  ];
  bookWriting: Select[]=[
    {value:'Cyrillic', viewValue:"Cyrillic"},
    {value:'Latin Alphabet', viewValue:'Latin Alphabet'}
  ];


  constructor(private bookService:BooksService, 
    private authorService:AuthorsService, 
    private publisherService:PublisherService, 
    private genresService:GenreService,  
    private _snackBar:MatSnackBar,
    private http: HttpClient) { }

  ngOnInit(): void {

    this.genresService.getGenres().subscribe({
      next: data => {
       this.allGenres=data;
       console.log(data);
      },
      error: err =>{
        console.log(err)
      
      }
    })
    this.authorService.getAuthors().subscribe({
      next: data => {
       this.allAuthors=data;
       console.log(data);
      },
      error: err =>{
        console.log(err)
        
      }
    })

    this.publisherService.getPublishers().subscribe({
      next: data => {
       this.allPublishers=data;
       console.log(data);
      },
      error: err =>{
        console.log(err)
        
      }
    })
  }

  bookForm = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required,]),
    description: new UntypedFormControl('', [Validators.required, ]),
    code: new UntypedFormControl('', [Validators.required, ]),
    genres:new UntypedFormControl('', [Validators.required, ]),
    authors:new UntypedFormControl('', [Validators.required, ]),
    publisher:new UntypedFormControl('', [Validators.required, ]),
    numberOfPages:new UntypedFormControl('', [Validators.required, ]),
    bookCover:new UntypedFormControl('', [Validators.required, ]),
    bookFormat:new UntypedFormControl('', [Validators.required, Validators.pattern('^[0-9]{2}x[0-9]{2}$') ]),
    bookWritingSystem:new UntypedFormControl('', [Validators.required, ]),
    year:new UntypedFormControl('', [Validators.required, ]),
    price:new UntypedFormControl('', [Validators.required, ]),
    discount:new UntypedFormControl('', ),
    discountStartsFrom:new UntypedFormControl('', [ Validators.pattern('^\d{4}-\d{2}-\d{2}$')]),
    discountEndsAt:new UntypedFormControl('', [ Validators.pattern('^\d{4}-\d{2}-\d{2}$') ]),
  });

 
  
  /*
  handleFileInputChange(l: File): void {
    this.file_store = l;
    this.bookForm.get('image')?.setValue(`${this.file_store.name}`);
  }*/

  

  checkForm():void{

    if (this.bookForm.get('discount')?.value) {
      this.bookForm.get('discountStartsFrom')?.setValidators([Validators.required,  Validators.pattern('^\d{4}-\d{2}-\d{2}$') ]);
      this.bookForm.get('discountEndsAt')?.setValidators([Validators.required, Validators.pattern('^\d{4}-\d{2}-\d{2}$')]);
    } else {
      this.bookForm.get('discountStartsFrom')?.clearValidators();
      this.bookForm.get('discountEndsAt')?.clearValidators();
    }

    const newObject: any = {
      name: this.bookForm.get('name')?.value,
      description: this.bookForm.get('description')?.value,
      code: this.bookForm.get('code')?.value,
      bookAuthors: this.bookForm.get('authors')?.value.map((authorId: number) => ({
        authorId
      })),
      bookGenres: this.bookForm.get('genres')?.value.map((genreId: number) => ({
        genreId
      })),
      bookPublisher: {
        publisherId: this.bookForm.get('publisher')?.value,
        numberOfPages: this.bookForm.get('numberOfPages')?.value,
        bookCover: this.bookForm.get('bookCover')?.value,
        bookFormat: this.bookForm.get('bookFormat')?.value,
        bookWritingSystem: this.bookForm.get('bookWritingSystem')?.value,
        year: this.bookForm.get('year')?.value,
        price: this.bookForm.get('price')?.value,
        image: {
          path: "got2.png",
          size: 200
        },
        discount: this.bookForm.get('discount')?.value ? {
          discountPercentage: this.bookForm.get('discount')?.value,
          startsFrom: this.bookForm.get('discountStartsFrom')?.value,
          endsAt: this.bookForm.get('discountEndsAt')?.value
        } : null
      }
    };

    console.log(newObject);

    this.bookService.createBook(newObject).subscribe(
      (response) => {
        this._snackBar.open( "Book created" , "Close");
        console.log('Book created:', response);
      },
      (error) => {
        
        this._snackBar.open( error.error[0].propertyName + " : "+ error.error[0].errorMessage , "Close");
        console.error('Failed:', error);
      }
    );
   
  }
}
