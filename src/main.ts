import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import FunctionHelpers from './app/shared/utilities/functions';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

if (!Array.prototype.sortByProperty) 
{
  Array.prototype.sortByProperty = FunctionHelpers.sortByProperty
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
