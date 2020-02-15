import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { itemAnim } from '../../anims/item.anim';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations: [
    itemAnim
  ]
})
export class TaskItemComponent implements OnInit {

  // 笨属性，自己并不知道数据从哪里来，是父组件传输给它的
  @Input() item;
  @Input() avatar;

  // 发射事件到上层处理
  @Output() taskClick = new EventEmitter<void>();

  // 动画初始状态，鼠标移出
  widerPriority = 'out';

  constructor() { }

  ngOnInit() {
    this.avatar = this.item.owner ? this.item.owner.avatar : 'unassigned';
  }

  onItemClick() {
    this.taskClick.emit();
  }

  onCheckBoxClick(ev: Event) {
    ev.stopPropagation();   //这个事件不继续往外传播，只给checkbox处理，阻止其他人处理
  }

  /** 组件动画 */
  @HostListener('mouseenter')
  onMouseEnter() {
    this.widerPriority = 'in';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.widerPriority = 'out';
  }
}
