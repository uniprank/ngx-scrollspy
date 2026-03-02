You can find the complete test case at GitHub. [Test Case 2](https://github.com/uniprank/ngx-scrollspy/tree/master/library/TestCases/src/app/modules/test-case2)

## TestCase2Component

```typescript
import { Component, OnInit } from '@angular/core';

import { ScrollSpyDirective, ScrollItemDirective, ScrollElementDirective } from '@uniprank/ngx-scrollspy';

@Component({
  selector: 'app-test-case2',
  standalone: true,
  imports: [ScrollSpyDirective, ScrollItemDirective, ScrollElementDirective],
  templateUrl: './test-case2.component.html',
  styleUrls: ['./test-case2.component.scss']
})
export class TestCase2Component implements OnInit {
  constructor() {}

  ngOnInit() {}
}
```

## TestCase2Component HTML

```html
<div>
  <h2>Overview</h2>
  <nav>
    <ul>
      <li uniScrollItem="section1" scrollElement="overview">Section 1</li>
      <li uniScrollItem="section2" scrollElement="overview">Section 2</li>
      <li uniScrollItem="section3" scrollElement="overview">Section 3</li>
      <li uniScrollItem="section4" scrollElement="overview">Section 4</li>
    </ul>
  </nav>
  <div uniScrollElement="overview" direction="horizontal">
    <section uniScrollSpy="section1"></section>
    <section uniScrollSpy="section2"></section>
    <section uniScrollSpy="section3"></section>
    <section uniScrollSpy="section4"></section>
  </div>
</div>
<div>
  <h2>Overview 2</h2>
  <nav>
    <ul>
      <li uniScrollItem="section5" scrollElement="overview2">Section 5</li>
      <li uniScrollItem="section6" scrollElement="overview2">Section 6</li>
      <li uniScrollItem="section7" scrollElement="overview2">Section 7</li>
      <li uniScrollItem="section8" scrollElement="overview2">Section 8</li>
    </ul>
  </nav>
  <div uniScrollElement="overview2" direction="horizontal">
    <section uniScrollSpy="section5"></section>
    <section uniScrollSpy="section6"></section>
    <section uniScrollSpy="section7"></section>
    <section uniScrollSpy="section8"></section>
  </div>
</div>
```
