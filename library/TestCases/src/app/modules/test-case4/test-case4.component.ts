import { Component, OnInit } from '@angular/core';
import { ScrollSpyService } from '@uniprank/ngx-scrollspy';

@Component({
    selector: 'app-test-case4',
    templateUrl: './test-case4.component.html',
    styleUrls: ['./test-case4.component.scss']
})
export class TestCase4Component implements OnInit {
    public markdown = require('raw-loader!./README.md');
    public sections: Array<any> = [];

    constructor(private _scrollSpyService: ScrollSpyService) {}

    ngOnInit() {
        // set offset because 2 sticky menu bars width single height of 50px
        this._scrollSpyService.setOffset('window', 50);
        const _sections = [];
        for (let i = 1; i <= 10; i++) {
            _sections.push({ id: `section${i}`, name: `Section ${i}` });
        }
        this.sections = _sections;
    }
}
