/*
 * Public API Surface of ngx-scrollspy
 */
// enums
export { ScrollDirectionEnum } from './lib/scroll-direction.enum';

// interfaces
export { ScrollObjectInterface } from './lib/scroll-object.interface';
export { ScrollElementInterface } from './lib/scroll-element.interface';

// services
export { ScrollSpyService, SpyConfig, SPY_CONFIG } from './lib/scroll-spy.service';

// directives
export { ScrollElementDirective } from './lib/scroll-element.directive';
export { ScrollItemDirective } from './lib/scroll-item.directive';
export { ScrollSpyDirective } from './lib/scroll-spy.directive';

// module (legacy)
export { NgxScrollspyModule } from './lib/ngx-scrollspy.module';

// standalone provider function
export { provideScrollSpy } from './lib/ngx-scrollspy.module';
