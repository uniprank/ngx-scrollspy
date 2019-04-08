import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-test-case2',
    templateUrl: './test-case2.component.html',
    styleUrls: ['./test-case2.component.scss']
})
export class TestCase2Component implements OnInit {
    public markdown = require('raw-loader!./README.md');
    constructor() {}

    ngOnInit() {}
}
