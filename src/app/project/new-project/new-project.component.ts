import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  title = '';
  coverImages = [];
  form: FormGroup;

  // 注入对话框的数据
  constructor(
    @Inject(MD_DIALOG_DATA) private data,  //上层组件传入数据
    private dialogRef: MdDialogRef<NewProjectComponent>,    //回响数据
    private fb: FormBuilder) { }   //使对话框样式符合主题

  ngOnInit() {
    this.coverImages = this.data.thumbnails;
    if(this.data.project) {
      this.form = this.fb.group({
        name: [this.data.project.name, Validators.required],
        desc: [this.data.project.desc],
        coverImg: [this.data.project.coverImg]
      });
      this.title = '修改项目：';
    } else {
      this.form = this.fb.group({
        name: ['', Validators.required],
        desc: [],
        coverImg: [this.data.img]
      });
      this.title = '创建项目：';
    }
    // console.log(JSON.stringify(this.data));
    this.title = this.data.title;
  }

  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    if(!valid) {
      return;
    }
    this.dialogRef.close(value);
  }

}
