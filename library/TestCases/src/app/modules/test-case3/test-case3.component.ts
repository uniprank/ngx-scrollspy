import { Component, OnInit, ElementRef, DestroyRef, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MarkdownComponent } from 'ngx-markdown';

import * as Stickyfill from 'stickyfilljs';

import { ScrollSpyDirective, ScrollItemDirective, ScrollSpyService } from '@uniprank/ngx-scrollspy';

@Component({
  selector: 'app-test-case3',
  standalone: true,
  imports: [AsyncPipe, MarkdownComponent, ScrollSpyDirective, ScrollItemDirective],
  templateUrl: './test-case3.component.html',
  styleUrls: ['./test-case3.component.scss']
})
export class TestCase3Component implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  public markdown = require('raw-loader!./README.md');
  public activeSection = new BehaviorSubject<{ id?: string; elementId?: string; nativeElement?: HTMLElement }>({});

  private _destroyRef = inject(DestroyRef);

  constructor(
    private _host: ElementRef,
    private _scrollSpyService: ScrollSpyService
  ) {}

  ngOnInit() {
    Stickyfill.add(this._host.nativeElement.querySelector('nav'));
    // set offset because 2 sticky menu bars width single height of 50px
    this._scrollSpyService.setOffset('window', 100);
    // subscribe to window scroll listener, it is also possible to use an ScrollSpyElement id
    this._scrollSpyService
      .observe('window')
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((item) => {
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
}
