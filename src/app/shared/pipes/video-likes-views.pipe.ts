import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'videoLikesViews'
})

export class VideoLikesViewsPipe implements PipeTransform {
  transform(value: any, args?: any[]): any {
    return parseInt(value, 10).toLocaleString('en');
  }
}
