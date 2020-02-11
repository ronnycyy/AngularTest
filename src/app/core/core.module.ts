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


@NgModule({
  imports: [
    HttpModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  declarations: [
    HeaderComponent, 
    FooterComponent, 
    SidebarComponent
  ],
  exports: [
    HeaderComponent, 
    FooterComponent, 
    SidebarComponent
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