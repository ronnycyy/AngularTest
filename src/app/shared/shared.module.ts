import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MdToolbarModule,
  MdIconModule, 
  MdButtonModule,
  MdCardModule,
  MdInputModule,
  MdListModule,
  MdSlideToggleModule,
  MdGridListModule,
} from '@angular/material';


/**
 * 1、把大家都需要的一些模块导入进来，再导出出去
 * 2、编写共享的组件
 */

@NgModule({
  imports: [
    CommonModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdListModule,
    MdSlideToggleModule,
    MdGridListModule,
  ],
  exports: [
    CommonModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdListModule,
    MdSlideToggleModule,
    MdGridListModule,
  ],
  declarations: []
})
export class SharedModule { }
