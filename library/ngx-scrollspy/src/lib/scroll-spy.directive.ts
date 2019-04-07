import { Directive, AfterViewInit, Input, ElementRef, HostBinding, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ScrollSpyService } from './scroll-spy.service';

@Directive({
    selector: '[uniScrollSpy]'
})
export class ScrollSpyDirective implements AfterViewInit, OnDestroy {
    @HostBinding('class.active') classActive: boolean = false;

    @Input('uniScrollSpy') itemId: string;
    @Input() stream: string = 'window';

    private _subscriber: Subscription;

    constructor(private _el: ElementRef, private _scrollSpyService: ScrollSpyService) {}

    ngOnDestroy(): void {
        if (this._subscriber) {
            this._subscriber.unsubscribe();
        }
    }

    ngAfterViewInit(): void {
        this._subscriber = this._scrollSpyService.observe(this.stream).subscribe(element => {
            if (element != null) {
                const _active = element.id === this.itemId;
                setTimeout(() => (this.classActive = _active));
            }
        });
        this._scrollSpyService.setItem(this.itemId, this._el, this.stream);
        this._el.nativeElement.setAttribute('id', this.itemId);
    }
}
