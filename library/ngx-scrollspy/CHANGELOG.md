# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-03-02

### Breaking Changes

- **Angular 19**: Minimum required Angular version is now `^19.0.0`
- **RxJS 7**: Minimum required RxJS version is now `^7.0.0`
- **Standalone Directives**: `ScrollSpyDirective`, `ScrollElementDirective`, and `ScrollItemDirective` are now standalone
- **Signals**: Directives use Angular Signals (`input()`, `output()`, `signal()`, `contentChildren()`) instead of decorators
- **providedIn root**: `ScrollSpyService` is now `providedIn: 'root'` — no need to add it to providers manually
- **NgxScrollspyModule**: Deprecated in favor of standalone directives and `provideScrollSpy()` function

### Added

- `provideScrollSpy(config?)` function for standalone application bootstrapping
- Signal-based inputs (`input()`, `input.required()`) on all directives
- Signal-based outputs (`output()`) on `ScrollItemDirective`
- Signal-based state (`signal()`) for `classActive` on directives
- Signal-based content queries (`contentChildren()`) on `ScrollElementDirective`
- `destroy()` method on `ScrollSpyService` for cleanup
- SSR compatibility: window access via `document.defaultView` instead of global `window`
- ESLint configuration (replaces TSLint)
- Strict template type checking

### Changed

- Upgraded from Angular 10 to Angular 19
- Upgraded from TypeScript 3.9 to TypeScript 5.7
- Upgraded from RxJS 6 to RxJS 7
- Uses `inject()` function instead of constructor-based dependency injection
- Uses `takeUntilDestroyed()` instead of manual subscription management
- Uses `host` metadata instead of `@HostBinding` / `@HostListener` decorators
- Replaced `@angular-devkit/build-ng-packagr` with `@angular-devkit/build-angular:ng-packagr`
- Replaced `karma-coverage-istanbul-reporter` with `karma-coverage`
- Library builder updated for modern ng-packagr
- Improved null-safety and TypeScript strict typing

### Removed

- TSLint (replaced by ESLint)
- `core-js` polyfill dependency
- `ngcc` postinstall script
- `emitDecoratorMetadata` / `experimentalDecorators` compiler options (Ivy default)
- `enableIvy: false` from production tsconfig
- View Engine metadata options (`skipTemplateCodegen`, `strictMetadataEmit`)
- `protractor`, `tsickle`, `codelyzer` dev dependencies

## [1.1.0] - 2020-08-28

### Changed

- Update to Angular 10

## [1.0.7] - 2020-03-23

### Changed

- refactor scroll spy service and directive

## [1.0.6] - 2020-02-28

### Added

- add **changelog** for later changes

### Changed

- Allow to configure the identifier write native attribute "id" or "data-id"

[2.0.0]: https://github.com/uniprank/ngx-scrollspy/tree/2.0.0
[1.1.0]: https://github.com/uniprank/ngx-scrollspy/tree/1.1.0
[1.0.7]: https://github.com/uniprank/ngx-scrollspy/tree/1.0.7
[1.0.6]: https://github.com/uniprank/ngx-scrollspy/tree/1.0.6
