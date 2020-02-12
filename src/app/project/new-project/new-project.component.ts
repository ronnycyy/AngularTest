import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef, OverlayContainer } from '@angular/material';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  // 注入对话框的数据
  constructor(
    @Inject(MD_DIALOG_DATA) private data,  //上层组件传入数据
    private dialogRef: MdDialogRef<NewProjectComponent>,    //回响数据
    private oc:OverlayContainer) { }   //使对话框样式符合主题

  ngOnInit() {
    console.log(JSON.stringify(this.data));
    this.oc.themeClass = this.data.dark ? 'myapp-dark-theme' : null;
  }

  onClick() {
    this.dialogRef.close('I receiced your message');
  }

}
