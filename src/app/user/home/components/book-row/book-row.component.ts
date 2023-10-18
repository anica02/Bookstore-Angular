import { Component, Input, OnInit } from '@angular/core';
import { IBookRow } from '../../interfaces/i-book-row';

@Component({
  selector: 'app-book-row',
  templateUrl: './book-row.component.html',
  styleUrls: ['./book-row.component.css']
})
export class BookRowComponent implements OnInit {

  @Input () row!: IBookRow;
  @Input () bookImgClassParent!: string;
  @Input () bookDiscountClassParent!: string;
  @Input() bookButtonViewClass!:string;
  @Input() bookButtonCartClass!:string;
  ngOnInit(): void {
    console.log(this.row);
  }

}
