import { Directive, HostListener, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

import { ScrollDirectionEnum } from './scroll-direction.enum';
import { ScrollSpyService } from './scroll-spy.service';

@Directive({
    selector: '[uniScrollElement]'
})
export class ScrollElementDirective implements OnInit, OnDestroy {
    @Input('uniScrollElement') elementId: string;
    @Input() direction: ScrollDirectionEnum = ScrollDirectionEnum.vertical;

    @HostListener('scroll', ['$event'])
    onScroll($event) {
        this._scrollSpyService.updateScrollElement(this.elementId);
    }

    constructor(private _el: ElementRef, private _scrollSpyService: ScrollSpyService) {}

    ngOnInit(): void {
        this._scrollSpyService.setScrollElement(this.elementId, this._el, this.direction);
        this._el.nativeElement.setAttribute('id', this.elementId);
    }

    ngOnDestroy(): void {
        this._scrollSpyService.deleteScrollElement(this.elementId);
    }
}
