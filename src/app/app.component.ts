import { Component, ReflectiveInjector, Inject } from '@angular/core';
import { OverlayContainer } from '@angular/material';
import { trigger, state, transition, style, animate, keyframes  } from '@angular/animations';
import { environment } from '../../AngularTest/src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    //触发器，定义状态
    trigger('square', 
      [
        state('green', style({'background-color': 'green', 'height': '100px', 'transform': 'translateY(100%)'})),
        state('red', style({'background-color': 'red', 'height': '100px', 'transform': 'translateY(0%)'})),
        transition('green => red', animate('.2s ease-in')),  //动画时长0.2s，延迟0.3s后触发
        // transition('red => green', animate(1000)),     //动画时长1s
        // transition('red => green', animate('.8s cubic-bezier(.24,-0.58,.5,.6)')),     //动画时长0.8s  ease-in慢进（快出）  ease-out慢出（快进）
        transition('red => green', animate(2000, keyframes([
          style({transform: 'translateY(100%)'}),
          style({transform: 'translateY(98%)'}),
          style({transform: 'translateY(95%)'}),
          style({transform: 'translateY(90%)'}),
          style({transform: 'translateY(80%)'}),
          style({transform: 'translateY(60%)'}),
          style({transform: 'translateY(30%)'}),
          style({transform: 'translateY(0)'}),
          style({transform: 'translateY(-10%)'}),
          style({transform: 'translateY(-5%)'}),
          style({transform: 'translateY(-2%)'}),
          style({transform: 'translateY(0)'}),
          style({transform: 'translateY(10%)'}),
          style({transform: 'translateY(35%)'}),
          style({transform: 'translateY(75%)'}),
          style({transform: 'translateY(100%)'}),
        ]))),
      ]
    )   
  ]
})
export class AppComponent {

  squareState: string;
  darkTheme = false;

  constructor(private oc:OverlayContainer, @Inject('BASE_CONFIG') config) {    //此处会去找'BASE_CONFIG'的provider，在core.module.ts中
    console.log(config);   
    // 依赖性注入实验
    // const injector = ReflectiveInjector.resolveAndCreate([    //[] provide数组，构建依赖性池子
    //   Person,   //等同于 { provide: Person, useClass: Person }, provide令牌，useClass或useFactory是填充依赖
    //   { provide: Address, useFactory: () => {
    //       if(environment.production)  {   //如果是生产环境
    //         return new Address('北京', '北京', '朝阳区', 'xx街道xx号');
    //       } else {   //开发环境
    //         return new Address('西藏', '拉萨', 'xx区', 'xx街道xx号');
    //       }
    //     } 
    //   },
    //   { provide: Id, useFactory: () => {
    //       return Id.getInstance('idcard');
    //     } 
    //   },
    // ]);
    // const childInjector = injector.resolveAndCreateChild([Person]);
    // const person = injector.get(Person);
    // const personFromChild = childInjector.get(Person);
    // console.log(person === personFromChild);
    // console.log(JSON.stringify(person));
  }

  // 切换白天or黑夜模式
  switchTheme(dark) {
    this.darkTheme = dark;
    this.oc.themeClass = dark ? 'myapp-dark-theme' : null;
  }

  onClick() {
    this.squareState = this.squareState === 'red' ? 'green' : 'red';
  }
}

// 依赖性注入实验
// class Id {
//   static getInstance(type: string): Id {
//     return new Id();
//   }
// }

// class Address {
//   province: string;
//   city: string;
//   district: string;
//   street: string;
//   constructor(province, city, district, street) {
//     this.province = province;
//     this.city = city;
//     this.district = district;
//     this.street = street;
//   }
// }

// class Person {
//   id: Id;
//   address: Address;
//   constructor(@Inject(Id) id, @Inject(Address) address) {
//     this.id = id;
//     this.address = address;
//   }
// }

