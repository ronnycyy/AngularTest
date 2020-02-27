import { Injectable } from '@angular/core';
import { Actions, toPayload, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import * as actions from '../actions/project.action';
import { AuthService } from 'app/services/auth.service';
import { User } from 'app/domain';
import { go } from '@ngrx/router-store';
import { ProjectService } from 'app/services/project.service';
import * as fromRoot from '../reducers';

@Injectable()
export class ProjectEffects {

  // 加载项目
  @Effect()
  loadProjects$: Observable<Action> = this.action$
    .ofType(actions.ActionTypes.LOAD) 
    .map(toPayload)
    .withLatestFrom(this.store$.select(fromRoot.getAuthState))
    .switchMap(([, auth]) => this.service$.get(auth.userId)
      .map(projects => new actions.LoadSuccessAction(projects))
      .catch(err => Observable.of(new actions.LoadFailAction(JSON.stringify(err)))) // 捕获到异常
    );

  // 新增项目
  @Effect()
  addProject$: Observable<Action> = this.action$
    .ofType(actions.ActionTypes.ADD) 
    .map(toPayload)
    .debug('add')
    .withLatestFrom(this.store$.select(fromRoot.getAuthState))
    .switchMap(([project, auth]) => {
       const added = {...project, members: [`${auth.userId}`]};
       return this.service$.add(added)
        .map(project => new actions.AddSuccessAction(project))
        .catch(err => Observable.of(new actions.AddFailAction(JSON.stringify(err))))
      }
    );

  // 修改项目
  @Effect()
  updateProject$: Observable<Action> = this.action$
    .ofType(actions.ActionTypes.UPDATE) 
    .map(toPayload)
    .switchMap((project) => this.service$.update(project)
      .map(projects => new actions.UpdateSuccessAction(projects))
      .catch(err => Observable.of(new actions.UpdateFailAction(JSON.stringify(err))))
    );

  // 删除项目
  @Effect()
  delProject$: Observable<Action> = this.action$
    .ofType(actions.ActionTypes.DELETE) 
    .map(toPayload)
    .switchMap((project) => this.service$.del(project)
      .map(projects => new actions.DeleteSuccessAction(projects))
      .catch(err => Observable.of(new actions.DeleteFailAction(JSON.stringify(err))))
    );

  // 选择项目
  @Effect()
  selectProject$: Observable<Action> = this.action$
    .ofType(actions.ActionTypes.SELECT_PROJECT)
    .map(toPayload)
    .map(project => go([`/tasklists/${project.id}`])); 

  // 邀请成员
  @Effect()
  invite$: Observable<Action> = this.action$
    .ofType(actions.ActionTypes.INVITE) 
    .map(toPayload)
    .switchMap(({projectId, members}) => this.service$.invite(projectId, members)
      .map(project => new actions.InviteSuccessAction(project))
      .catch(err => Observable.of(new actions.InviteFailAction(JSON.stringify(err))))
    );


  constructor(
    private action$: Actions, 
    private store$: Store<fromRoot.State>,
    private service$: ProjectService) {}
}