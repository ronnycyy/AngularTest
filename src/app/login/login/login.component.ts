import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { QuoteService } from 'app/services/quote.service';
import { Quote } from '../../domain/quote.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  quote:  Quote = {
    cn: '满足感在于不断的努力，而不是现有成就。全心努力定会胜利满满。',
    en: 'Satisfaction lies in constant effort, not existing achievements. Work hard and you will win.',
    pic: 'assets/img/quote_fallback.jpg',
  };
  // $表示quoteService是一个rx的事件流
  constructor(private fb: FormBuilder, private quoteService$: QuoteService) {
    this.quoteService$
      .getQuote()
      .subscribe(q => this.quote = q);
   }

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
