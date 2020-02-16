import { NgModule } from '@angular/core';
import { DragDirective } from './drag-drop/drag.directive';
import { DrogDirective } from './drag-drop/drog.directive';
import { DrapDropService } from './drap-drop.service';

@NgModule({
  declarations: [
    DragDirective, 
    DrogDirective
  ],
  exports: [
    DragDirective, 
    DrogDirective
  ],
  providers: [
    DrapDropService
  ]
})
export class DirectiveModule { }
