import { Component, Input, forwardRef, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
// 实现自定义表单控件
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, FormBuilder, FormGroup } from '@angular/forms';  //NG_VALUE_ACCESSOR 令牌；
import { Address } from 'app/domain';
import { Subject, Observable, Subscription } from 'rxjs';
import { getProvinces, getCitiesByProvince, getAreaByCity } from '../../utils/area.util';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, 
      useExisting: forwardRef(() => AreaListComponent),   //向前引用，等待组件实例化后，才进行令牌注册到依赖池
      multi: true  //多对一，多个类对应一个令牌
    },
    {
      provide: NG_VALIDATORS, 
      useExisting: forwardRef(() => AreaListComponent),   //向前引用，等待组件实例化后，才进行令牌注册到依赖池
      multi: true  //多对一，多个类对应一个令牌
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AreaListComponent implements OnInit, OnDestroy, ControlValueAccessor {

  _address: Address = {
    province: '',
    city: '',
    district: '',
    street: ''
  };
  _province = new Subject();
  _city = new Subject();
  _district = new Subject();
  _street = new Subject();

  // 用户选择省市区的时候的流（数据库流）
  provinces$: Observable<string[]>;
  cities$: Observable<string[]>;
  districts$: Observable<string[]>;

  sub: Subscription;

  private propagateChange = (_: any) => {};

  constructor() { }

  ngOnInit() {
    // 单个数据的流
    const province$ = this._province.asObservable().startWith('');
    const city$ = this._city.asObservable().startWith('');
    const district$ = this._district.asObservable().startWith('');
    const street$ = this._street.asObservable().startWith('');

    // 组合多个流，形成地址流
    const val$ = Observable.combineLatest([province$, city$, district$, street$], (_p, _c, _d, _s) => {
      return {
        province: _p,
        city: _c,
        district: _d,
        street: _s
      };
    });
    // 订阅该流，把值发射出去，让外部知道变化
    this.sub = val$.subscribe(v => {
      this.propagateChange(v);
    });

    // 获取源数据（列表展示）
    this.provinces$ = Observable.of(getProvinces());
    this.cities$ = province$.map((p: string) => getCitiesByProvince(p));   //由单个省份的选择，获取到该省份下，所有城市的数据流
    this.districts$ = Observable.combineLatest(province$, city$, (p: string, c: string) => getAreaByCity(p, c));    //组合单个省份和单个城市流，获取区县数据流
  }

  ngOnDestroy() {
    // 销毁地址流订阅
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

  /**
   * 给控件赋值
   */
  writeValue(obj: Address) {
    if(obj) {
      this._address = obj;
      if(this._address.province) {
        this._province.next(this._address.province);
      }
      if(this._address.city) {
        this._city.next(this._address.city);
      }
      if(this._address.district) {
        this._district.next(this._address.district);
      }
      if(this._address.street) {
        this._street.next(this._address.street);
      }
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
    if(val.province && val.city && val.district && val.street) {  //省市区地址有一个为空则验证不通过
      return null;
    }
    return {
      addressInvalid: true
    }
  }

  onProvinceChange() {
    this._province.next(this._address.province);
  }

  onCityChange() {
    this._city.next(this._address.city);
  }

  onDistrictChange() {
    this._district.next(this._address.district);
  }

  onStreetChange() {
    this._street.next(this._address.street);
  }
}
