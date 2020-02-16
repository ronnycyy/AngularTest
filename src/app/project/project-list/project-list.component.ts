import { Component, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from 'app/shared/confirm-dialog/confirm-dialog.component';

import { slideToRight } from '../../anims/router.anim';
import { listAnimation } from '../../anims/list.anim';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [
    slideToRight,
    listAnimation,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush     //侦查状态改变：使用OnPush策略（内部组件不更改，只有与它关联的组件更改时才改变状态）
})
export class ProjectListComponent implements OnInit {

  @HostBinding('@routeAnim') state;

  projects = [
    {
      "id": 1,
      "name": "企业协作平台",
      "desc": "这是一个企业内部项目",
      "coverImg": "assets/img/covers/0.jpg"
    },
    {
      "id": 2,
      "name": "自动化测试项目",
      "desc": "这是一个企业内部项目",
      "coverImg": "assets/img/covers/1.jpg"
    }
  ];

  // 注入dialog service
  constructor(private dialog: MdDialog, private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  // 打开新建项目对话框
  openNewProjectDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {title: '新建项目：'}});    // 重点！！！！ ProjectListComponent传递数据到NewProjectComponent
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.projects = [ ...this.projects, 
        {id: 3, name: '一个新项目', desc: '这是一个新项目', coverImg: 'assets/img/covers/11.jpg'}, 
        {id: 4, name: '又一个新项目', desc: '这是又一个新项目', coverImg: 'assets/img/covers/12.jpg'}, 
      ];   //添加新项目到项目列表
      this.cd.markForCheck();   //在这个点上，来检查我   告诉angular在事件发生时主动检查这条路线，其他的你不用检查
    });
  }

  lauchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent);   
  }

  launchUpdateDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {title: '编辑项目：'}}); 
  }

  launchConfirmDialog(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: '删除项目：', content: '您确认删除该项目吗?'}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.projects = this.projects.filter(p => p.id !== project.id);
      this.cd.markForCheck();
    });
  }
}
