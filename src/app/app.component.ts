import { Component } from '@angular/core';
import { OverlayContainer } from '@angular/material';
import { trigger, state, transition, style, animate, keyframes  } from '@angular/animations';

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

  constructor(private oc:OverlayContainer) {}

  // 切换白天or黑夜模式
  switchTheme(dark) {
    this.darkTheme = dark;
    this.oc.themeClass = dark ? 'myapp-dark-theme' : null;
  }

  onClick() {
    this.squareState = this.squareState === 'red' ? 'green' : 'red';
  }
}
