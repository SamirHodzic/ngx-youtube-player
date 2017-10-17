import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nowPlayingName'
})

export class NowPlayingNamePipe implements PipeTransform {
  transform(value: any, args?: any[]): any {
    const dots = ' ...';

    if (value.length > 56) {
      value = value.substring(0, 51) + dots;
    }

    return value;
  }
}
