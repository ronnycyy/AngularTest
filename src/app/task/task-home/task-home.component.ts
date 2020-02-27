import { Component, OnInit, HostBinding, ChangeDetectorRef } from '@angular/core';
import { MdDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';
import { CopyTaskComponent } from '../copy-task/copy-task.component';
import { ConfirmDialogComponent } from 'app/shared/confirm-dialog/confirm-dialog.component';
import { NewTaskListComponent } from '../new-task-list/new-task-list.component';

import { slideToRight } from '../../anims/router.anim';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TaskList } from 'app/domain';
import * as actions from '../../actions/task-list.action';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [
    slideToRight
  ]
})
export class TaskHomeComponent implements OnInit {

  @HostBinding('@routeAnim') state;
  projectId$: Observable<string>;
  lists$: Observable<TaskList[]>;

  constructor(
    private dialog: MdDialog,
    private store: Store<fromRoot.State>,
    private route: ActivatedRoute) { 
      this.projectId$ = this.route.paramMap.pluck('id');
      this.lists$ = this.store.select(fromRoot.getTaskLists);
    }

  ngOnInit() {
  }

  // 发射新任务对话框
  launchNewTaskDialog() {
    const dialogRef = this.dialog.open(NewTaskComponent, {data: {title: '新建任务'}});
  }

  launchCopyTaskDialog() {
    // 传递回响数据给下层组件（CopyTaskComponent）
    // const dialogRef = this.dialog.open(CopyTaskComponent, {data: {lists: this.lists}});
  }

  // 修改具体任务信息
  launchUpdateTaskDialog(task) {
    const dialogRef = this.dialog.open(NewTaskComponent, {data: {title: '修改任务', task: task}});
  }

  launchConfirmDialog(list: TaskList) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: '删除任务列表：', content: '您确认删除该任务列表吗?'}});
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .subscribe(result => this.store.dispatch(new actions.DeleteAction(list)));
  }

  launchEditListDialog(list: TaskList) {
    const dialogRef = this.dialog.open(NewTaskListComponent, {data: {title: '更改列表名称：', taskList: list}});
    dialogRef.afterClosed()
      .take(1)
      .subscribe(result => this.store.dispatch(new actions.UpdateAction({...result, id: list.id})));
  }

  launchNewListDialog(ev: Event) {
    const dialogRef = this.dialog.open(NewTaskListComponent, {data: {title: '新建列表：'}});
    dialogRef.afterClosed()
      .take(1)
      .subscribe(result => this.store.dispatch(new actions.AddAction(result)));
  }

  handleMove(srcData, list) {
    switch (srcData.tag) {
      case 'task-item':
        console.log('handling item');
        break;
      case 'task-list':
        console.log('handling list');

        // 交换source list 和 target list 的 order
        const srcList = srcData.data;    //拖拽过来的列表
        const tempOrder = srcList.order;
        srcList.order = list.order;  //target list
        list.order = tempOrder;
        break;
      default:
        break;
    }
  }

  handleQuickTask(desc: string) {
    console.log(desc);
  }

}
