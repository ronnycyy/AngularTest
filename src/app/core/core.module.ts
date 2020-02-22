import { NgModule, SkipSelf, Optional } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

// 导入共享模块
import { SharedModule } from '../shared/shared.module';

// svg图标操作库
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { loadSvgResources } from 'app/utils/svg.util';

// 导入core下组件
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';     //有了shared模块之后，就不用单独导入一个个模块了

// 导入路由模块
import { AppRoutingModule } from '../app-routing.module';

import { ServicesModule } from '../services/services.module';

import 'hammerjs';

import 'rxjs/add/observable/from';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/range';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/count';
import 'rxjs/add/operator/do';

import '../utils/debug.util';

@NgModule({
  imports: [
    HttpModule,
    SharedModule,
    AppRoutingModule,
    ServicesModule.forRoot(),     //导入了ServicesModule
    BrowserAnimationsModule,
  ],
  declarations: [
    HeaderComponent, 
    FooterComponent, 
    SidebarComponent
  ],
  exports: [
    HeaderComponent, 
    FooterComponent, 
    SidebarComponent,
    AppRoutingModule,    //AppModule中还需要路由模块，coreModule中需要带上
  ],
  providers: [
    {
      provide: 'BASE_CONFIG', useValue: {
        uri: 'http://localhost:3000'
      }
    },  //一旦放到这个池子里，它就变成一个单件
  ]
})
export class CoreModule {
  /**
  * 让core模块在系统中只加载一次
  */
  // 在构造函数中进行依赖性注入，为避免死循环，加入Optional 和 SkipSelf
  constructor(@Optional() @SkipSelf() parent: CoreModule,
  ir: MdIconRegistry, 
  ds: DomSanitizer) {
    // 如果系统当中已经存在了CoreModule, 抛出异常
    if (parent) {
      throw new Error('模块已经存在，不能再次加载！');
    }

    // 加载svg图标
    loadSvgResources(ir,ds);
  }
 }
