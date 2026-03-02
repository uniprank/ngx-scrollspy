import { NgModule, ModuleWithProviders, makeEnvironmentProviders, EnvironmentProviders } from '@angular/core';

import { ScrollSpyDirective } from './scroll-spy.directive';
import { ScrollItemDirective } from './scroll-item.directive';
import { ScrollElementDirective } from './scroll-element.directive';

import { SPY_CONFIG, SpyConfig } from './scroll-spy.service';

const directives = [ScrollSpyDirective, ScrollItemDirective, ScrollElementDirective];

/**
 * Provide ScrollSpy configuration for standalone applications.
 *
 * @example
 * ```typescript
 * bootstrapApplication(AppComponent, {
 *   providers: [provideScrollSpy({ lookAhead: true })]
 * });
 * ```
 */
export function provideScrollSpy(config: SpyConfig = { lookAhead: false }): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: SPY_CONFIG, useValue: config }]);
}

/**
 * @deprecated Use standalone directives (ScrollSpyDirective, ScrollItemDirective, ScrollElementDirective)
 * and provideScrollSpy() instead.
 */
@NgModule({
  imports: [...directives],
  exports: [...directives]
})
export class NgxScrollspyModule {
  public static forRoot(parameters: SpyConfig = { lookAhead: false }): ModuleWithProviders<NgxScrollspyModule> {
    return {
      ngModule: NgxScrollspyModule,
      providers: [{ provide: SPY_CONFIG, useValue: parameters }]
    };
  }
}
