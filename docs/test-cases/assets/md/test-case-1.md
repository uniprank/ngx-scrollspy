You can find the complete test case at GitHub. [Test Case 1](https://github.com/uniprank/ngx-scrollspy/tree/master/library/TestCases/src/app/modules/test-case1)

## TestCase1Component

```js
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
```

## TestCase1Component HTML

```html
<nav>
    <ul>
        <li uniScrollItem="section1">Section 1</li>
        <li uniScrollItem="section2">Section 2</li>
        <li uniScrollItem="section3">Section 3</li>
        <li uniScrollItem="section4">Section 4</li>
    </ul>
</nav>
<section uniScrollSpy="section1"></section>
<section uniScrollSpy="section2"></section>
<section uniScrollSpy="section3"></section>
<section uniScrollSpy="section4"></section>
```
