import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// 导入各自定义模块
import { CoreModule } from './core/core.module';  //若把文件名从core.module.ts 改为 index.ts，angular会默认将index.ts作为该模块的索引，这样直接写 “./core” 即可，会少写很多啰嗦的路径
import { LoginModule } from './login/login.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';

import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    LoginModule,
    ProjectModule,
    TaskModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
