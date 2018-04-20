import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideocallPage } from './videocall';

@NgModule({
  declarations: [
    VideocallPage,
  ],
  exports: [
    VideocallPage,
  ],
  imports: [
    IonicPageModule.forChild(VideocallPage),
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class VideocallPageModule {}
