import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // this.form = new FormGroup({
    //   email: new FormControl('m17722548276@163.com', Validators.compose([Validators.required, Validators.email])),
    //   password: new FormControl('', Validators.required)
    // })
    this.form = this.fb.group({
      email: ['chen@163.com', Validators.compose([Validators.required, Validators.email, this.validate])],
      password: ['', Validators.required]
    });
  }

  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    console.log(JSON.stringify(value));
    console.log(valid);
  }

  // 用户邮箱必须以 “chen” 开头
  validate(c: FormControl): {[key: string]: any} {
    if(!c.value) {
      return null;
    }
    const pattern = /^chen+/;
    if(pattern.test(c.value)) {
      return null;
    }

    return {
      emailNotValid: 'The email must start with chen'
    } 
  }

}
