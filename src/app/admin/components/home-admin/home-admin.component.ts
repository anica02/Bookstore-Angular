import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUserDb } from '../../interfaces/i-user-db';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  constructor(private userService:UsersService,
     private _snackBar:MatSnackBar,
    private cdr: ChangeDetectorRef, 
    private router: Router, 
    private ngZone: NgZone,
    public dialog: MatDialog) { }
    
  displayedColumns: string[] = [ 'id', 'firstName','lastName','username', 'email', 'role', 'isActive','createdAt','modifiedAt', 'modifiedBy','edit', 'delete'];
  dataSource!: any;
  users:IUserDb[]=[];

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers():void{
    this.userService.getUsers().subscribe({
      next: data => {
        this.users=data;
       this.dataSource=new MatTableDataSource<IUserDb>(data);
       this.cdr.detectChanges();
      },
      error: err =>{
        console.log(err)
        
      }
    })
  }

  deleteUser(id:number):void{

    this.userService.deleteUser(id).pipe(
      finalize(() => {
        this.ngZone.run(() => {

        
        });
      })
    ).subscribe(
      (response) => {
       
        this._snackBar.open('User deleted', 'Close');
        this.users= this.users.filter(item => item.id !== id);
          this.dataSource=new MatTableDataSource<IUserDb>(this.users);
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
        this.deleteUser(id);
      } 
    });
  }

  openDialog(id:number): void {
    const dialogRef = this.dialog.open(UserEditComponent, {data: id});
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.getUsers();
      }
    });
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
}
