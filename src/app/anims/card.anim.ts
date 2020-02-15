import { trigger, state, transition, style, animate, keyframes  } from '@angular/animations';

export const cardAnim = trigger('card', [     //声明触发器的名字
    state('out', style({transform: 'scale(1)', 'box-shadow': 'none'})),  //定义鼠标移出时的状态：不放大不缩小、无边框阴影
    state('hover', style({transform: 'scale(1.1)', 'box-shadow': '3px 3px 5px 6px #ccc'})),  //定义鼠标移入时的状态：放大1.1倍，加阴影
    transition('out => hover', animate('100ms ease-in')),
    transition('hover => out', animate('100ms ease-out')),
]);