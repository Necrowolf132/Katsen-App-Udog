import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RateWalkPage } from './rate-walk';

@NgModule({
  declarations: [
    RateWalkPage,
  ],
  exports: [
    RateWalkPage,
  ],
  imports: [
    IonicPageModule.forChild(RateWalkPage),
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class RateWalkPageModule {}
