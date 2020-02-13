import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss']
})
export class TaskHeaderComponent implements OnInit {

  @Input() header = '';   //在app-task-header标签中可接收

  constructor() { }

  ngOnInit() {
  }

}
