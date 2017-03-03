import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the OrderBy pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'orderBy'
})
@Injectable()
export class OrderBy {
  /*
    Takes a value and makes it lowercase.
   */
 transform(value, args) {
    if (!value || value === undefined || value.length === 0) return null;

    value.sort((a: any, b: any) => {
      if (a.orderId < b.orderId) {
        return -1;
      } else if (a.orderId > b.orderId) {
        return 1;
      } else {
        return 0;
      }
    });
    return value;
  }
}
