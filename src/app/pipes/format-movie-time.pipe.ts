import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatMovieTime'
})
export class FormatMovieTimePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    if ((value / 60) < 1) {
      return value < 10 ? `0${value}m` : `${value}m`
    } 
    
    const hours = Math.floor(value / 60);
    const min = value % 60;
    const leadingZero = min < 10 ? '0' : '';
    return `${hours}h ${leadingZero}${min}m`;
  }

}
