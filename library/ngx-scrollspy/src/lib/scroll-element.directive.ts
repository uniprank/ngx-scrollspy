import { Directive, ElementRef, OnInit, OnDestroy, AfterViewInit, inject, input, contentChildren } from '@angular/core';

import { ScrollDirectionEnum } from './scroll-direction.enum';
import { ScrollSpyService } from './scroll-spy.service';
import { ScrollSpyDirective } from './scroll-spy.directive';

@Directive({
  selector: '[uniScrollElement]',
  standalone: true,
  host: {
    '(scroll)': 'onScroll()'
  }
})
export class ScrollElementDirective implements OnInit, AfterViewInit, OnDestroy {
  readonly elementId = input.required<string>({ alias: 'uniScrollElement' });
  readonly direction = input<ScrollDirectionEnum>(ScrollDirectionEnum.vertical);

  readonly scrollSpyElements = contentChildren(ScrollSpyDirective, { descendants: true });

  private readonly _el = inject(ElementRef);
  private readonly _scrollSpyService = inject(ScrollSpyService);

  onScroll() {
    this._scrollSpyService.updateScrollElement(this.elementId());
  }

  ngOnInit(): void {
    this._scrollSpyService.setScrollElement(this.elementId(), this._el, this.direction());
    if (this._scrollSpyService.attributeType === 'id') {
      this._el.nativeElement.setAttribute('id', this.elementId());
    } else {
      this._el.nativeElement.setAttribute('data-id', this.elementId());
    }
  }

  ngAfterViewInit(): void {
    const elements = this.scrollSpyElements();
    elements.forEach((element) => {
      this._scrollSpyService.changeScrollElement(element.itemId(), element.scrollElement(), this.elementId());
    });
  }

  ngOnDestroy(): void {
    this._scrollSpyService.deleteScrollElement(this.elementId());
  }
}
