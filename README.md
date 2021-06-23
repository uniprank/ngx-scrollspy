[![npm version](https://img.shields.io/npm/v/@uniprank/ngx-scrollspy.svg?style=flat-square)](https://www.npmjs.com/package/@uniprank/ngx-scrollspy)
[![npm downloads](https://img.shields.io/npm/dm/@uniprank/ngx-scrollspy.svg?style=flat-square)](https://npmjs.org/package/@uniprank/ngx-scrollspy)
[![npm license](https://img.shields.io/npm/l/@uniprank/ngx-scrollspy.svg?style=flat-square)](https://npmjs.org/package/@uniprank/ngx-scrollspy)
[![travis build](https://img.shields.io/travis/uniprank/ngx-scrollspy?label=Travis%3Abuild&style=flat-square)](https://travis-ci.org/uniprank/ngx-scrollspy)

You can use this angular service to spy scroll events from `window` or any other scrollable element.

This library implements a service to collect observables from scroll spy directives. It can be used to create your own components or if you prefer use one of the following directives.

See Examples here [Example](https://uniprank.github.io/ngx-scrollspy)

# Installation

First you need to install the npm module:

```sh
npm install @uniprank/ngx-scrollspy --save
```

If you use SystemJS to load your files, you might have to update your config with this if you don't use `defaultJSExtensions: true`:

```js
System.config({
  packages: {
    '@uniprank/ngx-scrollspy': { defaultExtension: 'js' }
  }
});
```

Finally, you can use ngx-scrollspy in your Angular project (NOT AngularJS).
It is recommended to instantiate `ScrollSpyService` in the bootstrap of your application and do never add it to the "providers" property of your components, this way you will keep it as a singleton.
If you add it to the "providers" property of a component it will instantiate a new instance of the service that won't be initialized.

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxScrollspyModule } from '@uniprank/ngx-scrollspy';

@NgModule({
  imports: [BrowserModule, NgxScrollspyModule.forRoot()],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

# Using

## Basic scroll implementation vertical

You can find the complete test case at GitHub. [Test Case 1](https://github.com/uniprank/ngx-scrollspy/tree/master/library/TestCases/src/app/modules/test-case1)

### TestCase1Component

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

### TestCase1Component HTML

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

## Basic scroll implementation horizontal

You can find the complete test case at GitHub. [Test Case 2](https://github.com/uniprank/ngx-scrollspy/tree/master/library/TestCases/src/app/modules/test-case2)

### TestCase2Component

```js
@Component({
    selector: 'app-test-case2',
    templateUrl: './test-case2.component.html',
    styleUrls: ['./test-case2.component.scss']
})
export class TestCase2Component implements OnInit {
    constructor() {}

    ngOnInit() {}
}
```

### TestCase1Component HTML

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

---

## Spy window scroll

Use `ScrollSpyDirective` to spy on window as default or set also element to spy on a other scroll able element.

You can find the complete test case at GitHub. [Test Case 3](https://github.com/uniprank/ngx-scrollspy/tree/master/library/TestCases/src/app/modules/test-case3)

### TestCase3Component

```js
@Component({
    selector: 'app-test-case3',
    templateUrl: './test-case3.component.html',
    styleUrls: ['./test-case3.component.scss']
})
export class TestCase3Component implements OnInit, OnDestroy {
    public activeSection: BehaviorSubject<{ id?: string; elementId?: string; nativeElement?: HTMLElement }> = new BehaviorSubject({});

    private _subscription: Subscription;

    constructor(private _scrollSpyService: ScrollSpyService) {}

    ngOnInit() {
        // set offset because 2 sticky menu bars width single height of 50px
        this._scrollSpyService.setOffset('window', 100);
        // subscribe to window scroll listener, it is also possible to use an ScrollSpyElement id
        this._subscription = this._scrollSpyService.observe('window').subscribe(item => {
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

    ngOnDestroy() {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
    }
}
```

### TestCase3Component HTML

```html
<nav>
    <ul>
        <li uniScrollItem="section1">Section 1</li>
        <li uniScrollItem="section2">Section 2</li>
        <li uniScrollItem="section3">Section 3</li>
        <li uniScrollItem="section4">Section 4</li>
        <li>
            Active Section: [ <span [innerHtml]="(activeSection | async).id"></span>,
            <span [innerHtml]="(activeSection | async).elementId"></span> ]
        </li>
    </ul>
</nav>
<section uniScrollSpy="section1"></section>
<section uniScrollSpy="section2"></section>
<section uniScrollSpy="section3"></section>
<section uniScrollSpy="section4"></section>
```

Because `ScrollSpyService` is a singleton, you can get any ScrollSpy observable from anywhere withing your application.

---

## Nested Scroll Spy for menu navigation

You can find the complete test case at GitHub. [Test Case 4](https://github.com/uniprank/ngx-scrollspy/tree/master/library/TestCases/src/app/modules/test-case4)

### InnerTestComponent HTML

```html
<nav>
    <ul>
        <li *ngFor="let section of showSection; let i=index" [ngClass]="{base: section.base}">
            <a *ngIf="section.id != null" [uniScrollItem]="section.id" [innerHtml]="section.name" href="#{{section.id}}"></a>
            <span *ngIf="section.id == null" [innerHtml]="section.name"></span>
        </li>
    </ul>
</nav>
```

```js
@Component({
    selector: 'app-inner-test',
    templateUrl: './inner-test.component.html',
    styleUrls: ['./inner-test.component.scss']
})
export class InnerTestComponent implements OnInit {
    @Input() sections: Array<{ id: string; name: string }> = [];

    showSection: Array<{ id: string; name: string; base: boolean }> = [];

    constructor() {}

    ngOnInit() {
        this.showSection = this._generateMenu();
    }

    private _generateMenu(): Array<{ id: string; name: string; base: boolean }> {
        const _sections: Array<{ id: string; name: string; base: boolean }> = [];
        _sections.push({
            id: null,
            name: 'Main category',
            base: true
        });
        for (let i = 1; i <= this.sections.length; i++) {
            if (i % 3 == 0) {
                _sections.push({
                    id: null,
                    name: 'Sub category ' + i / 3,
                    base: true
                });
            }
            _sections.push({
                id: this.sections[i - 1].id,
                name: this.sections[i - 1].name,
                base: false
            });
        }
        return _sections;
    }
}
```

### TestCase4Component

```js
@Component({
    selector: 'app-test-case4',
    templateUrl: './test-case4.component.html',
    styleUrls: ['./test-case4.component.scss']
})
export class TestCase4Component implements OnInit {
    public markdown = require('raw-loader!./README.md');
    public sections: Array<any> = [];

    constructor(private _scrollSpyService: ScrollSpyService) {}

    ngOnInit() {
        // set offset because sticky menu bar width single height of 50px
        this._scrollSpyService.setOffset('window', 50);
        const _sections = [];
        for (let i = 1; i <= 10; i++) {
            _sections.push({ id: `section${i}`, name: `Section ${i}` });
        }
        this.sections = _sections;
    }
}
```

### TestCase4Component HTML

```html
<div class="template">
    <app-inner-test [sections]="sections"></app-inner-test>
    <div>
        <section *ngFor="let section of sections; let i=index" [uniScrollSpy]="section.id" [ngClass]="['section' + ((i+1)%5)]">
            <h2 [innerHtml]="section.name"></h2>
        </section>
    </div>
</div>
```

---

## Scroll Spy for ChangeDetectionStrategy.onPush

You can find the complete test case at GitHub. [Test Case 5](https://github.com/uniprank/ngx-scrollspy/tree/master/library/TestCases/src/app/modules/test-case5)

### InnerTestComponent HTML

```html
<nav>
    <ul>
        <li>OnPush</li>
        <li *ngFor="let section of sections" [uniScrollItem]="section.id" [innerHtml]="section.name"></li>
    </ul>
</nav>
```

```js
@Component({
    selector: 'app-inner-test',
    templateUrl: './inner-test.component.html',
    styleUrls: ['./inner-test.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InnerTestComponent implements OnInit {
    @Input() sections: Array<{ id: string, name: string }> = [];

    constructor() {}

    ngOnInit() {}
}
```

### TestCase5Component

```js
@Component({
    selector: 'app-test-case5',
    templateUrl: './test-case5.component.html',
    styleUrls: ['./test-case5.component.scss']
})
export class TestCase5Component implements OnInit {
    public sections: Array<any> = [];

    constructor(private _scrollSpyService: ScrollSpyService) {}

    ngOnInit() {
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
```

### TestCase5Component HTML

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

<app-inner-test [sections]="sections"></app-inner-test>
```

## Parameters

You can pass optional parameters to the instance when importing the module.

| Parameter | Value   | Description                                                                |
| --------- | ------- | -------------------------------------------------------------------------- |
| lookAhead | boolean | This is set the first item active even if it's not already in the viewport |

```js
@NgModule({
  imports: [NgxScrollspyModule.forRoot({ lookAhead: true })]
})
export class AppModule {}
```

# TODO:

- Finish unit tests

## License

[MIT](LICENSE)
