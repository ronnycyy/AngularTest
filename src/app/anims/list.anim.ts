import { trigger, stagger, transition, style, animate, query  } from '@angular/animations';

// 给动画起名字 listAnim
export const listAnimation = trigger('listAnim', [     //声明触发器的名字
    transition('* => *', [    //任意状态到任意状态
      query(':enter', style({opacity: 0}), {optional: true}),
      query(':enter', stagger(500, [
        animate('1s', style({opacity: 1}))
      ]), {optional: true}),
      query(':leave', style({opacity: 1}), {optional: true}),
      query(':leave', stagger(100, [
        animate('1s', style({opacity: 0}))
      ]), {optional: true}),
    ])
]);