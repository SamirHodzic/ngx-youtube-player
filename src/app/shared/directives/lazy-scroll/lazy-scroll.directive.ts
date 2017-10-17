import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[LazyScroll]',
  host: {
    '(scroll)': 'onScroll($event)'
  }
})
export class LazyScrollDirective {
  public _element: any;
  public _count: number;

  @Input('ScrollDistance') scrollTrigger: number;
  @Output() OnScrollMethod = new EventEmitter<any>();

  constructor(
    public element: ElementRef
  ) {
    this._element = this.element.nativeElement;
    if (!this.scrollTrigger) {
      this.scrollTrigger = 1;
    }
  }

  onScroll() {
    this._count++;
    if (this._element.scrollTop + this._element.clientHeight >= this._element.scrollHeight) {
      this.OnScrollMethod.emit(null);
    } else {
      if (this._count % this.scrollTrigger === 0) {
        this.OnScrollMethod.emit(null);
      }
    }
  }
}
