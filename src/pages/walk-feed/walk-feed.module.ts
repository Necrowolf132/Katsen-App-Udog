import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WalkFeedPage } from './walk-feed';

@NgModule({
  declarations: [
    WalkFeedPage,
  ],
  exports: [
    WalkFeedPage,
  ],
  imports: [
    IonicPageModule.forChild(WalkFeedPage),
  ],
})
export class WalkFeedPageModule {}
