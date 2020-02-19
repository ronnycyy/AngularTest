import { Component, Input, forwardRef } from '@angular/core';
// 实现自定义表单控件
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';  //NG_VALUE_ACCESSOR 令牌；

@Component({
  selector: 'app-image-list-select',
  templateUrl: './image-list-select.component.html',
  styleUrls: ['./image-list-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, 
      useExisting: forwardRef(() => ImageListSelectComponent),   //向前引用，等待组件实例化后，才进行令牌注册到依赖池
      multi: true  //多对一，多个类对应一个令牌
    },
    {
      provide: NG_VALIDATORS, 
      useExisting: forwardRef(() => ImageListSelectComponent),   //向前引用，等待组件实例化后，才进行令牌注册到依赖池
      multi: true  //多对一，多个类对应一个令牌
    },
  ]
})
export class ImageListSelectComponent implements ControlValueAccessor {

  @Input() title = '选择';
  @Input() cols = 6;   //默认显示六列头像
  @Input() rowHeight = '64px';   //行高
  @Input() items: string[] = [];   //图片地址
  @Input() useSvgIcon = false;   //是否使用svg
  @Input() itemWidth = '80px';   //

  selected: string;   //已选择的头像图片地址

  constructor() { }
  private propagateChange = (_: any) => {};

  // 选中头像
  onChange(i) {
    this.selected = this.items[i];
    this.propagateChange(this.selected);  //把变化通知给表单
  }

  /**
   * Writes a new value to the element.
   * 给控件赋值
   */
  writeValue(obj: any): void {
    this.selected = obj;
  }
  /**
   * Registers a callback function that should be called when the control's value
   * changes in the UI.
   * 控件值发生变化时，通知表单
   */
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  /**
   * Registers a callback function that should be called when the control receives
   * a blur event.
   */
  registerOnTouched(fn: any): void {}


  // 自定义验证方法，返回一个字典型的对象
  validate(c: FormControl): {[key:string]: any} {
    return this.selected ? null : {
      imageListInvalid: {
        valid: false
      }
    };
  }

}
