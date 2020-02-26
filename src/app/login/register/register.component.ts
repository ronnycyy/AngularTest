import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Form } from '@angular/forms';
import { Subscription } from 'rxjs';
import { extractInfo, getAddrByCode, isValidAddr } from '../../utils/identity.util';
import { isValidDate } from 'app/utils/date.util';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as authActions from '../../actions/auth.action';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  form: FormGroup;
  items: string[];
  sub: Subscription;
  private readonly avatarName = 'avatars';
  constructor(private fb: FormBuilder, private store$: Store<fromRoot.State>) { }

  ngOnInit() {
    const img = `${this.avatarName}:svg-${Math.floor(Math.random() * 16).toFixed(0)}`
    const nums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
    this.items = nums.map(d => `avatars:svg-${d}`);
    // 表单控制组件声明
    this.form = this.fb.group({
      email: [],
      name: [],
      password: [],
      repeat: [],
      avatar: [img],
      dateOfBirth: ['1990-01-01'],
      address: [],
      identity: []
    })
    
    const id$ = this.form.get('identity').valueChanges
      .debounceTime(300)   //停留300ms生效
      .filter(_ => this.form.get('identity').valid);   //过滤出有效的

    // 订阅上面这个流，得到流中的身份证号码后，显示出生日期、年龄、地址
    this.sub = id$.subscribe(id => {
      const info = extractInfo(id.identityNo);
      
      // 确认号码合法后进行处理
      if(isValidAddr(info.addrCode)) {
        const addr = getAddrByCode(info.addrCode);
        this.form.get('address').patchValue(addr);
      }
      if(isValidDate(info.dateOfBirth)) {
        this.form.get('dateOfBirth').patchValue(info.dateOfBirth);
      }
    })
  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();   //防止表单提交的默认行为
    if(!valid) {   //如果表单验证未通过，进行进一步处理
      return;
    }
    this.store$.dispatch(new authActions.RegisterAction(value));
  }

}
