import { Directive, Input, Output, EventEmitter, OnDestroy, HostBinding, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ScrollSpyService } from './scroll-spy.service';

@Directive({
    selector: '[uniScrollItem]'
})
export class ScrollItemDirective implements OnDestroy, AfterViewInit {
    @HostBinding('class.active') classActive: boolean = false;

    @Input('uniScrollItem') itemId: string;
    @Input() stream: string = 'window';

    @Output() activeEvent: EventEmitter<boolean> = new EventEmitter();

    private _subscriber: Subscription;

    constructor(private _scrollSpyService: ScrollSpyService) {}

    ngOnDestroy(): void {
        if (this._subscriber) {
            this._subscriber.unsubscribe();
        }
        this._scrollSpyService.deleteItem(this.itemId);
    }

    ngAfterViewInit(): void {
        this._subscriber = this._scrollSpyService.observe(this.stream).subscribe(element => {
            if (element != null) {
                const _active = element.id === this.itemId;
                this.activeEvent.emit(_active);
                setTimeout(() => (this.classActive = _active));
            }
        });
    }
}
