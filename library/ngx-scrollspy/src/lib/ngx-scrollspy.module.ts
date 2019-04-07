import { NgModule, Provider, ModuleWithProviders } from '@angular/core';

import { ScrollSpyDirective } from './scroll-spy.directive';
import { ScrollItemDirective } from './scroll-item.directive';
import { ScrollElementDirective } from './scroll-element.directive';

import { ScrollSpyService } from './scroll-spy.service';

const directives: any[] = [ScrollSpyDirective, ScrollItemDirective, ScrollElementDirective];
const components: any[] = [];
const providers: Provider[] = [ScrollSpyService];

@NgModule({
    declarations: [...directives, ...components],
    exports: [...directives, ...components]
})
export class NgxScrollspyModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: NgxScrollspyModule,
            providers: [...providers]
        };
    }
}
