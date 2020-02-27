import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-task-list',
  templateUrl: './new-task-list.component.html',
  styleUrls: ['./new-task-list.component.scss']
})
export class NewTaskListComponent implements OnInit {

  form: FormGroup;
  title = '';

  constructor(
    private fb: FormBuilder,
    @Inject(MD_DIALOG_DATA) private data, 
    private dialogRef: MdDialogRef<NewTaskListComponent>) { }

  ngOnInit() {
    this.title = this.data.title;
    this.form = this.fb.group({
      name: [this.data.taskList ? this.data.taskList.name : '', Validators.required]
    });
  }

  onSubmit({value, valid}) {
    if(!valid) {
      return;
    }
    this.dialogRef.close(value);
  }

}
