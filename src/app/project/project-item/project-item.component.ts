import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {

  // 接受标签上的item属性
  @Input() item;

  constructor() { }

  ngOnInit() {
  }

}
