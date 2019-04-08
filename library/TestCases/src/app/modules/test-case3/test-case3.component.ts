import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { ScrollSpyService } from '@uniprank/ngx-scrollspy';

@Component({
    selector: 'app-test-case3',
    templateUrl: './test-case3.component.html',
    styleUrls: ['./test-case3.component.scss']
})
export class TestCase3Component implements OnInit, OnDestroy {
    public markdown = require('raw-loader!./README.md');
    public activeSection: BehaviorSubject<{ id?: string; elementId?: string; nativeElement?: HTMLElement }> = new BehaviorSubject({});

    private _subscription: Subscription;

    constructor(private _scrollSpyService: ScrollSpyService) {}

    ngOnInit() {
        // set offset because 2 sticky menu bars width single height of 50px
        this._scrollSpyService.setOffset('window', 100);
        // subscribe to window scroll listener, it is also possible to use an ScrollSpyElement id
        this._subscription = this._scrollSpyService.observe('window').subscribe(item => {
            if (item != null) {
                const _nextSection = {
                    id: item.id,
                    elementId: item.scrollElementId
                };
                this.activeSection.next(_nextSection);
                console.info(`ScrollSpyService: item:`, item);
            }
        });
    }

    ngOnDestroy() {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
    }
}
