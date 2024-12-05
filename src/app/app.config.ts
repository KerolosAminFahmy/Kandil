import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { loaderInterceptor } from '../shared/interceptors/loader.interceptor';
import { authInterceptor } from '../shared/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(
    withInterceptors([loaderInterceptor,authInterceptor])
  ), provideHttpClient(),  provideAnimations(),  MessageService,
]
};
