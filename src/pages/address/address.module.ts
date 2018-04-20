import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddressPage } from './address';

@NgModule({
  declarations: [
    AddressPage,
  ],
  exports: [
    AddressPage,
  ],
  imports: [
    IonicPageModule.forChild(AddressPage),
  ],
})
export class AddressPageModule {}
