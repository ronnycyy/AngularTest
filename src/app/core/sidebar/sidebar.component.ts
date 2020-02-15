import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { getDate } from 'date-fns';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() navClick = new EventEmitter<void>();

  /**获取当前日期 */
  // 初始化成员变量 'day'
  today = 'day';

  constructor() { }

  ngOnInit() {
    this.today = `day${getDate(new Date())}`;   //当前日期[new Date()] 转换成 这个月第几号[getDate()]
  }

  onNavClick() {
    this.navClick.emit();
  }

}
