import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgFor } from '@angular/common';

import { ScrollItemDirective } from '@uniprank/ngx-scrollspy';

@Component({
  selector: 'app-inner-test',
  standalone: true,
  imports: [NgFor, ScrollItemDirective],
  templateUrl: './inner-test.component.html',
  styleUrls: ['./inner-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InnerTestComponent implements OnInit {
  @Input() sections: Array<{ id: string; name: string }> = [];

  constructor() {}

  ngOnInit() {}
}
