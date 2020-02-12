/**项目的列表显示，项目的编辑，邀请其他人员加入项目 */

import { NgModule } from '@angular/core';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectItemComponent } from './project-item/project-item.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { InviteComponent } from './invite/invite.component';

import { ProjectRoutingModule } from './project-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ProjectRoutingModule,
  ],
  declarations: [
    ProjectListComponent, 
    ProjectItemComponent,
    NewProjectComponent, 
    InviteComponent
  ],
  entryComponents: [
    NewProjectComponent, 
    InviteComponent
  ]
})
export class ProjectModule { }
