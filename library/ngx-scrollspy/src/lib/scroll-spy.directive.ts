import { Directive, AfterViewInit, Input, ElementRef, HostBinding, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { ScrollSpyService } from './scroll-spy.service';

@Directive({
  selector: '[uniScrollSpy]'
})
export class ScrollSpyDirective implements AfterViewInit, OnDestroy {
  @HostBinding('class.active') classActive = false;

  @Input('uniScrollSpy') itemId: string;
  @Input() scrollElement = 'window';

  private _subscriber: Subscription;

  constructor(private _el: ElementRef, private _scrollSpyService: ScrollSpyService, private _cdr: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    if (this._subscriber) {
      this._subscriber.unsubscribe();
    }
    this._scrollSpyService.deleteItem(this.itemId);
  }

  ngAfterViewInit(): void {
    this._subscriber = this._scrollSpyService.observe(this.scrollElement).subscribe((element) => {
      if (element != null) {
        const _active = element.id === this.itemId;
        setTimeout(() => {
          this.classActive = _active;
          this._cdr.markForCheck();
        });
      }
    });
    this._scrollSpyService.setItem(this.itemId, this._el, this.scrollElement);

    let _keyType = 'id';
    if (this._scrollSpyService.attributeType === 'data-id') {
      _keyType = 'data-id';
    }
    this._el.nativeElement.setAttribute(_keyType, this.itemId);
  }
}
