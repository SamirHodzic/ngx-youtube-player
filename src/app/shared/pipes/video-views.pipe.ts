import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'videoViews'
})

export class VideoViewsPipe implements PipeTransform {
  transform(value: any, args?: any[]): any {
    return parseInt(value, 10).toLocaleString('en');
  }
}
