import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideIndexedDb } from 'ngx-indexed-db';
import dbConfig from './core/indexDB';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideIndexedDb(dbConfig),
    provideToastr({
      timeOut: 1000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: false
    })
  ],
};
