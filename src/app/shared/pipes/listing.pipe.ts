import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listing'
})
export class ListingPipe implements PipeTransform {

  transform(value: string, listing: string, isLast: boolean)  {
    return !isLast ? value + listing : value;
  }
}
