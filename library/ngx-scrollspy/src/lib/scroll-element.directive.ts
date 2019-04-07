import { Directive, HostListener, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

import { ScrollDirectionEnum } from './scroll-direction.enum';
import { ScrollSpyService } from './scroll-spy.service';

@Directive({
    selector: '[uniScrollElement]'
})
export class ScrollElementDirective implements OnInit, OnDestroy {
    @Input('uniScrollElement') streamId: string;
    @Input() direction: ScrollDirectionEnum = ScrollDirectionEnum.vertical;

    @HostListener('scroll', ['$event'])
    onScroll($event) {
        this._scrollSpyService.updateStream(this.streamId);
    }

    constructor(private _el: ElementRef, private _scrollSpyService: ScrollSpyService) {}

    ngOnInit(): void {
        this._scrollSpyService.setStream(this.streamId, this._el, this.direction);
        this._el.nativeElement.setAttribute('id', this.streamId);
    }

    ngOnDestroy(): void {
        this._scrollSpyService.deleteStream(this.streamId);
    }
}
