import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
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
export class InnerTestComponent {
  @Input() sections: { id: string; name: string }[] = [];
}
