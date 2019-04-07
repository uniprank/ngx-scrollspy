import { Component, OnInit } from '@angular/core';
import { ScrollSpyService } from '@uniprank/ngx-scrollspy';

@Component({
    selector: 'app-test-case1',
    templateUrl: './test-case1.component.html',
    styleUrls: ['./test-case1.component.scss']
})
export class TestCase1Component implements OnInit {
    constructor(private _scrollSpyService: ScrollSpyService) {}

    ngOnInit() {
        this._scrollSpyService.setOffset('window', 100);
    }
}
