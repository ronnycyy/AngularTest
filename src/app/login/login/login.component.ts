import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Quote } from '../../domain/quote.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/quote.action';
import * as authActions from '../../actions/auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  quote$: Observable<Quote>;
  // $表示quoteService是一个rx的事件流
  constructor(
    private fb: FormBuilder,
    private store$: Store<fromRoot.State>
    ) 
  {
    this.quote$ = this.store$.select(fromRoot.getQuote);  
    this.store$.dispatch(new actions.LoadAction(null));
  }

  ngOnInit() {
    // this.form = new FormGroup({
    //   email: new FormControl('m17722548276@163.com', Validators.compose([Validators.required, Validators.email])),
    //   password: new FormControl('', Validators.required)
    // })
    this.form = this.fb.group({
      email: ['yi@163.com', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }

  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    if(!valid) {
      return;
    }
    // 发射登录action
    this.store$.dispatch(new authActions.LoginAction(value));
  }

}
