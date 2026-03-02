import { Component, OnInit, ElementRef } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

import * as Stickyfill from 'stickyfilljs';

import { ScrollSpyDirective, ScrollItemDirective, ScrollSpyService } from '@uniprank/ngx-scrollspy';

import { InnerTestComponent } from './modules/inner-test/inner-test.component';

@Component({
  selector: 'app-test-case5',
  standalone: true,
  imports: [MarkdownComponent, ScrollSpyDirective, ScrollItemDirective, InnerTestComponent],
  templateUrl: './test-case5.component.html',
  styleUrls: ['./test-case5.component.scss']
})
export class TestCase5Component implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  public markdown = require('raw-loader!./README.md');
  public sections: { id: string; name: string }[] = [];

  constructor(
    private _host: ElementRef,
    private _scrollSpyService: ScrollSpyService
  ) {}

  ngOnInit() {
    Stickyfill.add(this._host.nativeElement.querySelector('.sticky'));
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
