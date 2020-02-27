import { Component, OnInit, Input, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { cardAnim } from '../../anims/card.anim';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations: [
    cardAnim
  ]
})
export class ProjectItemComponent implements OnInit {

  // 接受标签上的item属性
  @Input() item;
  
  @Output() onInvite = new EventEmitter<void>();   // 发射邀请事件
  @Output() onEdit = new EventEmitter<void>();
  @Output() onDel = new EventEmitter<void>();
  @Output() onSelected = new EventEmitter<void>();
  @HostBinding('@card') cardState = 'out';      //绑定卡片动画初始状态，当前组件已绑定自己的动画

  constructor() { }

  ngOnInit() {
  }

  /** 组件动画 */
  @HostListener('mouseenter')
  onMouseEnter() {
    this.cardState = 'hover';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.cardState = 'out';
  }

  /**发射项目操作事件（上层组件ProjectListComponent监听） */
  onInviteClick(ev: Event) {
    ev.stopPropagation();
    this.onInvite.emit();
  }

  onEditClick(ev: Event) {
    ev.stopPropagation();
    this.onEdit.emit();
  }

  onDelClick(ev: Event) {
    ev.stopPropagation();
    this.onDel.emit();
  }

  /** 其他点击事件（如邀请、编辑等），阻止向上冒泡，这样就不会重复到这个onClick事件中 */
  onClick() {
    this.onSelected.emit();
  }
}
