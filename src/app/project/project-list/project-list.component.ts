import { 
  Component, 
  OnInit, 
  OnDestroy,
  HostBinding, 
  ChangeDetectionStrategy, 
  ChangeDetectorRef } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from 'app/shared/confirm-dialog/confirm-dialog.component';

import { slideToRight } from '../../anims/router.anim';
import { listAnimation } from '../../anims/list.anim';
import { ProjectService } from 'app/services/project.service';

import * as _ from 'lodash';
import { Project } from 'app/domain';
import { Subscription } from 'rxjs/Subscription';

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
export class ProjectListComponent implements OnInit, OnDestroy {

  @HostBinding('@routeAnim') state;

  projects = [];
  sub: Subscription;

  // 注入dialog service
  constructor(private dialog: MdDialog, private cd: ChangeDetectorRef, private service$: ProjectService) { }

  ngOnInit() {
    this.sub = this.service$.get("1").subscribe(projects => {
      this.projects = projects;
      console.log("获得项目列表：", this.projects);
      this.cd.markForCheck();    //手动激活自动更改检测，防止项目一上来模板中没有数据
    });   //取得某个成员的所有项目
  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

  // 打开新建项目对话框
  openNewProjectDialog() {
    const selectedImg = `/assets/img/covers/${Math.floor(Math.random() * 40)}_tn.jpg`;
    const dialogRef = this.dialog.open(
      NewProjectComponent, 
      {data: {thumbnails: this.getThumbnails(), img: selectedImg}}
    );    // 重点！！！！ ProjectListComponent传递数据到NewProjectComponent
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .map(val => ({...val, coverImg: this.buildImgSrc(val.coverImg)}))
      .switchMap(v => this.service$.add(v))
      .subscribe(project => {
        this.projects = [...this.projects, project];   //将新增的项目添加到项目列表中
        this.cd.markForCheck();
      });

    // dialogRef.afterClosed().filter(n => n).subscribe(project => {
    //   this.service$.add(project);
    //   // console.log(result);
    //   // this.projects = [ ...this.projects, 
    //   //   {id: 3, name: '一个新项目', desc: '这是一个新项目', coverImg: 'assets/img/covers/11.jpg'}, 
    //   //   {id: 4, name: '又一个新项目', desc: '这是又一个新项目', coverImg: 'assets/img/covers/12.jpg'}, 
    //   // ];   //添加新项目到项目列表
    //   this.cd.markForCheck();   //在这个点上，来检查我   告诉angular在事件发生时主动检查这条路线，其他的你不用检查
    // });
  }

  lauchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent, {data: {members: []}});   
  }

  launchUpdateDialog(project: Project) {
    const dialogRef = this.dialog.open(
      NewProjectComponent, 
      {data: {thumbnails: this.getThumbnails(), project: project}}
    );    // 重点！！！！ ProjectListComponent传递数据到NewProjectComponent
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .map(val => ({...val, id: project.id, coverImg: this.buildImgSrc(val.coverImg)}))
      .switchMap(v => this.service$.update(v))
      .subscribe(project => {
        const index = this.projects.map(p => p.id).indexOf(project.id);
        this.projects = [...this.projects.slice(0, index), project, ...this.projects.slice(index + 1)]
        this.cd.markForCheck();
      });
  }

  launchConfirmDialog(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: '删除项目：', content: '您确认删除该项目吗?'}});
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .switchMap(_ => this.service$.del(project))
      .subscribe(prj => {
        this.projects = this.projects.filter(p => p.id !== prj.id);
        this.cd.markForCheck();
      });
  }

  // 获取项目缩略图
  private getThumbnails() {
    return _.range(0, 40) //生成一个集合从0开始到40
      .map(i => `/assets/img/covers/${i}_tn.jpg`)
  }

  private buildImgSrc(img: string): string {
    return img.indexOf('_') > -1 ? img.split('_')[0] + '.jpg' : img;
  }
}
