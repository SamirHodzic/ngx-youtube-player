import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'videoName'
})

export class VideoNamePipe implements PipeTransform {
  transform(value: any, args: any[]): any {
    const dots = '...';

    if (value.length > args[0]) {
      value = value.substring(0, args[1]) + dots;
    }

    return value;
  }
}
