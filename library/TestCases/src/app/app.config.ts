import { ApplicationConfig } from '@angular/core';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideMarkdown } from 'ngx-markdown';

import { provideScrollSpy } from '@uniprank/ngx-scrollspy';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptorsFromDi()),
    provideMarkdown(),
    provideScrollSpy({ lookAhead: true })
  ]
};
