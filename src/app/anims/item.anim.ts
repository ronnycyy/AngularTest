import { trigger, state, transition, style, animate, keyframes  } from '@angular/animations';

export const itemAnim = trigger('item', [     //声明触发器的名字
    state('out', style({'border-left-width': '3px'})),  //定义鼠标移出时的状态：不放大不缩小、无边框阴影
    state('in', style({'border-left-width': '8px'})),  //定义鼠标移入时的状态：放大1.1倍，加阴影
    transition('in => out', animate('100ms ease-in')),
    transition('out => in', animate('100ms ease-out')),
]);