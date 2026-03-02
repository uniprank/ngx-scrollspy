import { Component } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

import { ScrollSpyDirective, ScrollItemDirective, ScrollElementDirective } from '@uniprank/ngx-scrollspy';

@Component({
  selector: 'app-test-case2',
  standalone: true,
  imports: [MarkdownComponent, ScrollSpyDirective, ScrollItemDirective, ScrollElementDirective],
  templateUrl: './test-case2.component.html',
  styleUrls: ['./test-case2.component.scss']
})
export class TestCase2Component {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  public markdown = require('raw-loader!./README.md');
}
