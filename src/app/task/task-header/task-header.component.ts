import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss']
})
export class TaskHeaderComponent implements OnInit {

  @Input() header = '';   //在app-task-header标签中可接收
  @Output() newTask = new EventEmitter<void>();     //声明待发射的 “新任务” 事件
  @Output() moveAll = new EventEmitter<void>();     
  @Output() delList = new EventEmitter<void>();     
  @Output() onEditList = new EventEmitter<void>();     

  constructor() { }

  ngOnInit() {
  }

  onNewTaskClick() {
    this.newTask.emit();    //发射 “新任务” 事件到上层组件处理
  }

  onMoveAllClick() {
    this.moveAll.emit();
  }

  onDelListClick() {
    this.delList.emit();
  }

  onEditListClick() {
    this.onEditList.emit();
  }

}
