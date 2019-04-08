import { Component, OnInit } from '@angular/core';

import { ScrollSpyService } from '@uniprank/ngx-scrollspy';

@Component({
    selector: 'app-test-case5',
    templateUrl: './test-case5.component.html',
    styleUrls: ['./test-case5.component.scss']
})
export class TestCase5Component implements OnInit {
    public markdown = require('raw-loader!./README.md');
    public sections: Array<any> = [];

    constructor(private _scrollSpyService: ScrollSpyService) {}

    ngOnInit() {
        // set offset because 2 sticky menu bars width single height of 50px
        this._scrollSpyService.setOffset('window', 100);
        setTimeout(() => {
            this.sections = [
                { id: 'section1', name: 'Section 1' },
                { id: 'section2', name: 'Section 2' },
                { id: 'section3', name: 'Section 3' }
            ];
        });
    }
}
