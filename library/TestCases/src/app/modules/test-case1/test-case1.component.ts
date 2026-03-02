import { Component, OnInit, ElementRef } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

import * as Stickyfill from 'stickyfilljs';

import { ScrollSpyDirective, ScrollItemDirective, ScrollSpyService } from '@uniprank/ngx-scrollspy';

@Component({
  selector: 'app-test-case1',
  standalone: true,
  imports: [MarkdownComponent, ScrollSpyDirective, ScrollItemDirective],
  templateUrl: './test-case1.component.html',
  styleUrls: ['./test-case1.component.scss']
})
export class TestCase1Component implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  public markdown = require('raw-loader!./README.md');
  constructor(
    private _host: ElementRef,
    private _scrollSpyService: ScrollSpyService
  ) {}

  ngOnInit() {
    Stickyfill.add(this._host.nativeElement.querySelector('nav'));
    this._scrollSpyService.setOffset('window', 100);
  }
}
