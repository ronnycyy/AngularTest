import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  MdToolbarModule,
  MdIconModule, 
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdInputModule,
  MdListModule,
  MdSlideToggleModule,
  MdGridListModule,
  MdDialogModule,
  MdAutocompleteModule,
  MdMenuModule,
  MdCheckboxModule,
  MdTooltipModule,
  MdDatepickerModule,
  MdRadioModule,
  MdNativeDateModule,
  MdSelectModule,
  MdSidenavModule,
  MdChipsModule,
  MdTabsModule,
} from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DirectiveModule } from '../directive/directive.module';
import { ImageListSelectComponent } from './image-list-select/image-list-select.component';
import { AgeInputComponent } from './age-input/age-input.component';
import { ChipsListComponent } from './chips-list/chips-list.component';
import { IdentityInputComponent } from './identity-input/identity-input.component';
import { AreaListComponent } from './area-list/area-list.component';

/**
 * 1、把大家都需要的一些模块导入进来，再导出出去
 * 2、编写共享的组件
 */

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdInputModule,
    MdListModule,
    MdSlideToggleModule,
    MdGridListModule,
    MdDialogModule,
    MdAutocompleteModule,
    MdMenuModule,
    MdCheckboxModule,
    MdTooltipModule,
    MdDatepickerModule,
    MdRadioModule,
    MdNativeDateModule,
    MdSelectModule,
    MdSidenavModule,
    MdChipsModule,
    MdTabsModule,
    DirectiveModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdInputModule,
    MdListModule,
    MdSlideToggleModule,
    MdGridListModule,
    MdDialogModule,
    MdAutocompleteModule,
    MdMenuModule,
    MdCheckboxModule,
    MdTooltipModule,
    MdDatepickerModule,
    MdRadioModule,
    MdNativeDateModule,
    MdSelectModule,
    MdSidenavModule,
    MdChipsModule,
    MdTabsModule,
    DirectiveModule,
    ImageListSelectComponent,
    AgeInputComponent,
    ChipsListComponent,
    IdentityInputComponent, 
    AreaListComponent,
  ],
  entryComponents: [   //dialog组件要放到这个数组中
    ConfirmDialogComponent
  ],
  declarations: [
    ConfirmDialogComponent, 
    ImageListSelectComponent, 
    AgeInputComponent, 
    ChipsListComponent, 
    IdentityInputComponent, 
    AreaListComponent,
  ]
})
export class SharedModule { }
