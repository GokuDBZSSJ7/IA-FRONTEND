import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideHttpClient(), provideToastr({
    positionClass: 'toast-bottom-right', // Define a posição do toast
    preventDuplicates: true, // Evita toasts duplicados
    timeOut: 3000, // Tempo padrão para fechar automaticamente
  }),]
};
