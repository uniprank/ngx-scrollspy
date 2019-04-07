import { Directive, HostListener, ElementRef, Input, OnInit, OnDestroy, ContentChildren, QueryList, AfterViewInit } from '@angular/core';

import { ScrollDirectionEnum } from './scroll-direction.enum';
import { ScrollSpyService } from './scroll-spy.service';
import { ScrollSpyDirective } from './scroll-spy.directive';

@Directive({
    selector: '[uniScrollElement]'
})
export class ScrollElementDirective implements OnInit, AfterViewInit, OnDestroy {
    @Input('uniScrollElement') elementId: string;
    @Input() direction: ScrollDirectionEnum = ScrollDirectionEnum.vertical;

    @ContentChildren(ScrollSpyDirective, { descendants: true }) private _scrollSpyElements: QueryList<ScrollSpyDirective>;

    @HostListener('scroll', ['$event'])
    onScroll($event) {
        this._scrollSpyService.updateScrollElement(this.elementId);
    }

    constructor(private _el: ElementRef, private _scrollSpyService: ScrollSpyService) {}

    ngOnInit(): void {
        this._scrollSpyService.setScrollElement(this.elementId, this._el, this.direction);
        this._el.nativeElement.setAttribute('id', this.elementId);
    }

    ngAfterViewInit(): void {
        let _scrollSpyElements: ScrollSpyDirective[] = this._scrollSpyElements.toArray();
        _scrollSpyElements.forEach(element => {
            this._scrollSpyService.changeScrollElement(element.itemId, element.scrollElement, this.elementId);
        });
    }

    ngOnDestroy(): void {
        this._scrollSpyService.deleteScrollElement(this.elementId);
    }
}
