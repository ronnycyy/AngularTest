import { Injectable } from '@angular/core';
import { Actions, toPayload, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import * as actions from '../actions/auth.action';
import { AuthService } from 'app/services/auth.service';
import { User } from 'app/domain';
import { go } from '@ngrx/router-store';

@Injectable()
export class AuthEffects {

  // 登录
  @Effect()
  login$: Observable<Action> = this.action$
    .ofType(actions.ActionTypes.LOGIN) 
    .map(toPayload)
    .switchMap(({email, password}) => this.service$.login(email, password)
      .map(auth => new actions.LoginSuccessAction(auth))
      .catch(err => Observable.of(new actions.LoginFailAction(JSON.stringify(err)))) // 捕获到异常
    );

  // 注册
  @Effect()
  register$: Observable<Action> = this.action$
    .ofType(actions.ActionTypes.REGISTER) 
    .map(toPayload)
    .switchMap((user: User) => this.service$.register(user)
      .map(auth => new actions.RegisterSuccessAction(auth))
      .catch(err => Observable.of(new actions.RegisterFailAction(JSON.stringify(err)))) // 捕获到异常
    );

  // 登出
  @Effect()
  logout$: Observable<Action> = this.action$
    .ofType(actions.ActionTypes.LOGOUT) 
    .map(_ => go(['/']));    //导航到首页
    

    
  // 登录后导航到项目页
  @Effect()
  loginAndNavigate$: Observable<Action> = this.action$
    .ofType(actions.ActionTypes.LOGIN_SUCCESS) 
    .map(_ => go(['/projects']));   

  // 注册后导航到项目页
  @Effect()
  registerAndNavigate$: Observable<Action> = this.action$
    .ofType(actions.ActionTypes.REGISTER_SUCCESS) 
    .map(_ => go(['/projects']));    

  constructor(private action$: Actions, private service$: AuthService) {}
}