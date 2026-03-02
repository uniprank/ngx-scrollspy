[![CI](https://github.com/uniprank/ngx-scrollspy/actions/workflows/ci.yml/badge.svg)](https://github.com/uniprank/ngx-scrollspy/actions/workflows/ci.yml)

You can use this angular service to spy scroll events from `window` or any other scrollable element.

This library implements a service to collect observables from scroll spy directives. It can be used to create your own components or if you prefer use one of the following directives.

See Examples here [Example](https://uniprank.github.io/ngx-scrollspy/test-cases)

## Installation

First you need to install the npm module:

```sh
npm install @uniprank/ngx-scrollspy --save
```

## Setup (Standalone API)

Use `provideScrollSpy()` in your application config to set up the service:

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideScrollSpy } from '@uniprank/ngx-scrollspy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideScrollSpy({ lookAhead: true })
  ]
};
```

```typescript
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig);
```

Then import the standalone directives directly in your components:

```typescript
import { Component } from '@angular/core';
import { ScrollSpyDirective, ScrollItemDirective } from '@uniprank/ngx-scrollspy';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ScrollSpyDirective, ScrollItemDirective],
  template: `
    <li uniScrollItem="section1">Section 1</li>
    <section uniScrollSpy="section1">Content</section>
  `
})
export class ExampleComponent {}
```

### Available Directives

| Directive | Selector | Description |
|-----------|----------|-------------|
| `ScrollSpyDirective` | `[uniScrollSpy]` | Marks a content section to be tracked by the scroll spy |
| `ScrollItemDirective` | `[uniScrollItem]` | Marks a navigation item that mirrors the active state |
| `ScrollElementDirective` | `[uniScrollElement]` | Wraps a custom scrollable container (non-window) |

## Using

#### Spy window scroll

Use `ScrollSpyDirective` to spy on window as default or set `scrollElement` to spy on another scrollable element.

```typescript
import { Component } from '@angular/core';
import { ScrollSpyDirective, ScrollItemDirective, ScrollSpyService } from '@uniprank/ngx-scrollspy';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ScrollSpyDirective, ScrollItemDirective],
  template: `<div uniScrollSpy="section-abc"></div>`
})
export class ExampleComponent implements AfterViewInit {
  constructor(private _scrollSpyService: ScrollSpyService) {}

  ngAfterViewInit() {
    this._scrollSpyService.observe('window').subscribe((element) => {
      console.log('ScrollSpy::window: ', element);
    });
  }
}
```

#### Spy any element scroll

Use `ScrollElementDirective` to spy on any element. You must give a unique id to each instance.
This unique id is called elementID and you need this elementID to connect your `ScrollItemDirective` or your `ScrollSpyDirective`.

```typescript
import { Component, AfterViewInit } from '@angular/core';
import {
  ScrollSpyDirective,
  ScrollItemDirective,
  ScrollElementDirective,
  ScrollSpyService,
  ScrollObjectInterface
} from '@uniprank/ngx-scrollspy';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ScrollSpyDirective, ScrollItemDirective, ScrollElementDirective],
  template: `
    <div uniScrollItem="part2" scrollElement="test">Get class active if part2 is in focus.</div>
    <div uniScrollElement="test" style="max-height: 100px; overflow: auto;">
      <div uniScrollSpy="part1" style="height: 500px;"></div>
      <div uniScrollSpy="part2" style="height: 500px;"></div>
    </div>
  `
})
export class ExampleComponent implements AfterViewInit {
  constructor(private _scrollSpyService: ScrollSpyService) {}

  ngAfterViewInit() {
    this._scrollSpyService.observe('test').subscribe((element: ScrollObjectInterface) => {
      console.log('ScrollSpy::test: ', element);
    });
  }
}
```

Because `ScrollSpyService` is a singleton, you can get any ScrollSpy observable from anywhere within your application.

## Parameters

You can pass optional parameters to `provideScrollSpy()`:

| Parameter | Value | Description |
|-----------|-------|-------------|
| `lookAhead` | boolean | Set the first item active even if it's not already in the viewport |
| `activateOnlySetItems` | boolean | Only activate items when fully within the viewport |
| `attributeType` | `'id'` \| `'data-id'` | Which HTML attribute to set on spy elements (default: `'id'`) |

```typescript
provideScrollSpy({ lookAhead: true })
```

# TODO:

- Finish unit tests

## License

[MIT](LICENSE)
