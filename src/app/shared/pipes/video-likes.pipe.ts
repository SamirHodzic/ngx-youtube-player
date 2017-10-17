import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'videoLikes'
})

export class VideoLikesPipe implements PipeTransform {
  transform(value: any, args?: any[]): any {
    return parseInt(value, 10).toLocaleString('en');
  }
}
