import { Component, Input, forwardRef, OnDestroy, OnInit } from '@angular/core';
// 实现自定义表单控件
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, FormBuilder, FormGroup } from '@angular/forms';  //NG_VALUE_ACCESSOR 令牌；
import { User } from 'app/domain';
import { Observable } from 'rxjs';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-chips-list',
  templateUrl: './chips-list.component.html',
  styleUrls: ['./chips-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, 
      useExisting: forwardRef(() => ChipsListComponent),   //向前引用，等待组件实例化后，才进行令牌注册到依赖池
      multi: true  //多对一，多个类对应一个令牌
    },
    {
      provide: NG_VALIDATORS, 
      useExisting: forwardRef(() => ChipsListComponent),   //向前引用，等待组件实例化后，才进行令牌注册到依赖池
      multi: true  //多对一，多个类对应一个令牌
    },
  ]
})
export class ChipsListComponent implements OnInit, ControlValueAccessor {

  @Input() multiple = true; 
  @Input() placeholderText = '请输入成员 email'; 
  @Input() label = '添加/修改成员';
  form: FormGroup;
  items: User[] = [];
  memberResults$: Observable<User[]>; 

  constructor(private fb: FormBuilder, private service: UserService) { }

  ngOnInit() {
    this.form = this.fb.group({
      memberSearch: ['']
    });
    this.memberResults$ = this.form.get('memberSearch').valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .filter(s => s && s.length > 1)
      .switchMap(str => this.service.searchUsers(str));
  }

  private propagateChange = (_: any) => {};

  /**
   * 给控件赋值
   */
  writeValue(obj: User[]): void {
    if(obj && this.multiple) {   //如果是多个值
      const userEntities = obj.reduce((e, c) => ({...e, c}), {});
      if(this.items) {
        const remaining = this.items.filter(item => !userEntities[item.id]);
        this.items = [...remaining, ...obj];
      }
    } else if(obj && !this.multiple) {
      this.items = [...obj];
    }
  }
  /**
   * 控件值发生变化时，通知表单
   */
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}

  validate(c: FormControl): {[key:string]: any} {
    return this.items ? null : {
      chipListInvalid: true
    };
  }

  removeMember(member: User) {
    const ids = this.items.map(item => item.id);
    const i = ids.indexOf(member.id);
    if(this.multiple) {
      this.items = [...this.items.slice(0, i), ...this.items.slice(i+1)]
    } else {
      this.items = [];
    }
    this.form.patchValue({memberSearch: ''});
    this.propagateChange(this.items);
  }

  handleMemberSelection(member: User) {
    if(this.items.map(item => item.id).indexOf(member.id) !== -1) {
      return ;
    }
    this.items = this.multiple ? [...this.items, member] : [member];
    this.form.patchValue({memberSearch: member.name});
    this.propagateChange(this.items);
  }

  displayUser(user: User): string {
    return user ? user.name : '';
  }

  get displayInput() {
    return this.multiple || this.items.length === 0;
  }

}
