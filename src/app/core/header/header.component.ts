import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers'
import { getAuthState } from '../../reducers';
import { Observable } from 'rxjs';
import { Auth } from 'app/domain/auth.model';
import * as actions from '../../actions/auth.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  auth$: Observable<Auth>;
  // 声明发射事件，在app-header标签绑定事件处理逻辑
  @Output() toggle = new EventEmitter<void>();
  @Output() toggleDarkTheme = new EventEmitter<boolean>();   //发射黑夜主题事件

  constructor(private store$: Store<fromRoot.State>) { 
    this.auth$ = this.store$.select(getAuthState);
  }

  ngOnInit() {
  }

  // 发射事件：侧边栏触发
  openSidebar() {
    this.toggle.emit();
  }

  // 发射事件：白天or夜间模式切换
  onChange(checked: boolean) {
    this.toggleDarkTheme.emit(checked);
  } 

  logout() {
    this.store$.dispatch(new actions.LogoutAction(null));
  }
}
