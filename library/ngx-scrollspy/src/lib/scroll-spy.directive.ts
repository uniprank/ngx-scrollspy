import { Directive, AfterViewInit, ElementRef, OnDestroy, DestroyRef, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ScrollSpyService } from './scroll-spy.service';

@Directive({
  selector: '[uniScrollSpy]',
  standalone: true,
  host: {
    '[class.active]': 'classActive()'
  }
})
export class ScrollSpyDirective implements AfterViewInit, OnDestroy {
  readonly itemId = input.required<string>({ alias: 'uniScrollSpy' });
  readonly scrollElement = input<string>('window');

  readonly classActive = signal(false);

  private readonly _el = inject(ElementRef);
  private readonly _scrollSpyService = inject(ScrollSpyService);
  private readonly _destroyRef = inject(DestroyRef);

  ngOnDestroy(): void {
    this._scrollSpyService.deleteItem(this.itemId());
  }

  ngAfterViewInit(): void {
    this._scrollSpyService
      .observe(this.scrollElement())
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((element) => {
        if (element != null) {
          this.classActive.set(element.id === this.itemId());
        }
      });
    this._scrollSpyService.setItem(this.itemId(), this._el, this.scrollElement());

    const keyType = this._scrollSpyService.attributeType === 'data-id' ? 'data-id' : 'id';
    this._el.nativeElement.setAttribute(keyType, this.itemId());
  }
}
