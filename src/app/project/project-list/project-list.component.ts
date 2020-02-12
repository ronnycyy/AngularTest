import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projects = [
    {
      "name": "企业协作平台",
      "desc": "这是一个企业内部项目",
      "coverImg": "assets/img/covers/0.jpg"
    },
    {
      "name": "自动化测试项目",
      "desc": "这是一个企业内部项目",
      "coverImg": "assets/img/covers/1.jpg"
    }
  ];

  // 注入dialog service
  constructor(private dialog: MdDialog) { }

  ngOnInit() {
  }

  // 打开新建项目对话框
  openNewProjectDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {dark: true}});    // 重点！！！！ ProjectListComponent传递数据到NewProjectComponent
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  lauchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent);   
  }
}
