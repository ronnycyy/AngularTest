import { Component, Input, forwardRef, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
// 实现自定义表单控件
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, FormBuilder, FormGroup } from '@angular/forms';  //NG_VALUE_ACCESSOR 令牌；
import { IdentityType, Identity } from 'app/domain';
import { Subject } from 'rxjs/Subject';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-identity-input',
  templateUrl: './identity-input.component.html',
  styleUrls: ['./identity-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, 
      useExisting: forwardRef(() => IdentityInputComponent),   //向前引用，等待组件实例化后，才进行令牌注册到依赖池
      multi: true  //多对一，多个类对应一个令牌
    },
    {
      provide: NG_VALIDATORS, 
      useExisting: forwardRef(() => IdentityInputComponent),   //向前引用，等待组件实例化后，才进行令牌注册到依赖池
      multi: true  //多对一，多个类对应一个令牌
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdentityInputComponent implements OnInit, OnDestroy, ControlValueAccessor {

  identityTypes = [
    {
      value: IdentityType.IdCard, label: '身份证'
    },
    {
      value: IdentityType.Insurance, label: '医保'
    },
    {
      value: IdentityType.Passport, label: '护照'
    },
    {
      value: IdentityType.Military, label: '军官证'
    },
    {
      value: IdentityType.Other, label: '其它'
    },
  ];
  identity: Identity = {identityType: null, identityNo: null};

  private _idType = new Subject<IdentityType>();
  private _idNo = new Subject<string>();
  private propagateChange = (_: any) => {};
  private sub: Subscription;

  constructor() { }

  ngOnInit() {
    const val$ = Observable.combineLatest(this.idNo, this.idType, (_no, _type) => {
      return {
        identityType: _type,
        identityNo: _no
      };
    });
    this.sub = val$.subscribe(id => {
      this.propagateChange(id);
    })
  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

  onIdTypeChange(idType: IdentityType) {
    this._idType.next(idType);
  }

  onIdNoChange(idNo: string) {
    this._idNo.next(idNo);
  }

  get idType(): Observable<IdentityType> {
    return this._idType.asObservable();
  }

  get idNo(): Observable<string> {
    return this._idNo.asObservable();
  }

  /**
   * 给控件赋值
   */
  writeValue(obj: any) {
    if(obj) {
      this.identity = obj;
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
    const val = c.value;
    if(!val) {
      return null;
    }
    // 根据不同证件类型，分出不同的验证
    switch (val.identityType) {
      case IdentityType.IdCard: {
        return this.validateIdCard(c);
      }
      case IdentityType.Passport: {
        return this.validatePassport(c);
      }
      case IdentityType.Military: {
        return this.validateMilitary(c);
      }
      case IdentityType.Insurance:
      default: {
        return null;
      }
    }
  }

  /** 身份证号码验证 */
  validateIdCard(c: FormControl): {[key:string]: any} {
    const val = c.value.identityNo;
    // 身份证号码不是18位
    if(val.length !== 18) {
      return {idInvalid: true};
    }
    // 身份证号码匹配规则
    const pattern = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}[x0-9]$/;
    return pattern.test(val) ? null : {idNotValid: true};
  }

  /** 护照验证 */
  validatePassport(c: FormControl): {[key:string]: any} {
    const val = c.value.identityNo;
    // 护照号码不是9位
    if(val.length !== 9) {
      return {idInvalid: true};
    }
    // 护照号码匹配规则
    const pattern = /^[GgEe]\d{8}$/;
    return pattern.test(val) ? null : {idNotValid: true};
  }

  /** 士兵证验证 */
  validateMilitary(c: FormControl): {[key:string]: any} {
    const val = c.value.identityNo;

    const pattern = /[\u4e00-\u9fa5](字第)(\d{4,8})(号?)$/;
    return pattern.test(val) ? null : {idNotValid: true};
  }

}
