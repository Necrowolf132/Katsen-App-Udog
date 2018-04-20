import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookWalkPage } from './book-walk';

@NgModule({
  declarations: [
    BookWalkPage,
  ],
  exports: [
    BookWalkPage,
  ],
  imports: [
    IonicPageModule.forChild(BookWalkPage),
  ],
})
export class BookWalkPageModule {}
