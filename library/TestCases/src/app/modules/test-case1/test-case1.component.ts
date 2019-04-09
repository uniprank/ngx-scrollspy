import { Component, OnInit, ElementRef } from '@angular/core';

import * as Stickyfill from 'stickyfilljs';

import { ScrollSpyService } from '@uniprank/ngx-scrollspy';

@Component({
    selector: 'app-test-case1',
    templateUrl: './test-case1.component.html',
    styleUrls: ['./test-case1.component.scss']
})
export class TestCase1Component implements OnInit {
    public markdown = require('raw-loader!./README.md');
    constructor(private _host: ElementRef, private _scrollSpyService: ScrollSpyService) {}

    ngOnInit() {
        Stickyfill.add(this._host.nativeElement.querySelector('nav'));
        this._scrollSpyService.setOffset('window', 100);
    }
}
