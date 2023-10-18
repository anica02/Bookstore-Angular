import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { IBook } from 'src/app/shared/interfaces/i-book';
import { BooksService } from 'src/app/shared/services/books.service';

@Component({
  selector: 'app-books-admin',
  templateUrl: './books-admin.component.html',
  styleUrls: ['./books-admin.component.css']
})
export class BooksAdminComponent implements OnInit {


  constructor(private booksService: BooksService, 
    public dialog: MatDialog, 
    private _snackBar:MatSnackBar,
    private cdr: ChangeDetectorRef, 
    private router: Router, 
    private ngZone: NgZone,
    ) { }

  displayedColumns: string[] = [ 'id', 'code','name','file','publisherId','price', 'discount', 'startsFrom', 'endsAt','isActive', 'createdAt', 'modifiedAt', 'modifiedBy', 'deletedAt', 'deletedBy', 'delete'];
  dataSource!: any;

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks():void{
    this.booksService.getBooksAdmin().subscribe({
      next: data => {
        console.log(data);
       this.dataSource=new MatTableDataSource<IBook>(data);
      
      },
      error: err =>{
        console.log(err)
      }
    })
  }
  formatValue(value: any): string {
    if (value === null) {
      return 'null';
    } else if (typeof value === 'string' && value.trim() === '') {
      return '""';
    } else {
      return value;
    }
  }

  editBook(id:number):void{

  }

  deleteBook(id:number):void{
    this.booksService.deleteBook(id).subscribe(
      (response) => {
       
        this._snackBar.open('Book deleted', 'Close');
       
          this.getBooks();
          this.cdr.detectChanges();
      },
      (error) => {
        console.error('Failed:', error);
        this._snackBar.open("Data conflict", "Close");
      }
    );
  }

  openConfirmationDialog(id:number): void {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteBook(id);
      } 
    });
  }

  createBookFormRedirect():void{
    this.router.navigate(['/book-create']);
  }
}
