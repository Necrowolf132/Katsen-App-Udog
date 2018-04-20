import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WalksPage } from './walks';

@NgModule({
  declarations: [
    WalksPage,
  ],
  exports: [
    WalksPage,
  ],
  imports: [
    IonicPageModule.forChild(WalksPage),
  ],
})
export class WalksPageModule {}
