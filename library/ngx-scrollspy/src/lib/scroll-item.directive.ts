import { Directive, AfterViewInit, DestroyRef, inject, input, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ScrollSpyService } from './scroll-spy.service';

@Directive({
  selector: '[uniScrollItem]',
  standalone: true,
  host: {
    '[class.active]': 'classActive()'
  }
})
export class ScrollItemDirective implements AfterViewInit {
  readonly itemId = input.required<string>({ alias: 'uniScrollItem' });
  readonly scrollElement = input<string>('window');

  readonly activeEvent = output<boolean>();
  readonly classActive = signal(false);

  private readonly _scrollSpyService = inject(ScrollSpyService);
  private readonly _destroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    this._scrollSpyService
      .observe(this.scrollElement())
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((element) => {
        let _active: boolean;
        if (element != null) {
          _active = element.id === this.itemId();
          this.activeEvent.emit(_active);
        } else {
          _active = false;
        }
        this.classActive.set(_active);
      });
  }
}
