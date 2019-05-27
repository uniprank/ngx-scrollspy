import { NgModule, Provider, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';

import { ScrollSpyDirective } from './scroll-spy.directive';
import { ScrollItemDirective } from './scroll-item.directive';
import { ScrollElementDirective } from './scroll-element.directive';

import { SPY_CONFIG, SpyConfig, ScrollSpyService } from './scroll-spy.service';
import { CommonModule } from '@angular/common';

const directives: any[] = [ScrollSpyDirective, ScrollItemDirective, ScrollElementDirective];
const components: any[] = [];
const providers: Provider[] = [ScrollSpyService];

@NgModule({
    imports: [CommonModule],
    declarations: [...directives, ...components],
    exports: [...directives, ...components]
})
export class NgxScrollspyModule {
    public static forRoot(parameters: SpyConfig = {lookAhead: false
    }): ModuleWithProviders {
        return {
            ngModule: NgxScrollspyModule,
            providers: [...providers, {provide: SPY_CONFIG, useValue: parameters}]
        };
    }
}
