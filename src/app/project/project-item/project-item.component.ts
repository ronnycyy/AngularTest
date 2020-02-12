import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {

  // 接受标签上的item属性
  @Input() item;
  // 发射邀请事件
  @Output() onInvite = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onInviteClick() {
    this.onInvite.emit();
  }
}
