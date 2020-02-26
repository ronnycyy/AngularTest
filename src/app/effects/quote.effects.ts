import { Injectable } from '@angular/core';
import { Actions, toPayload, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import * as actions from '../actions/quote.action';
import { QuoteService } from '../services/quote.service';

@Injectable()
export class QuoteEffects {

  // 处理 LOAD 的action
  @Effect()
  quote$: Observable<Action> = this.action$
    .ofType(actions.ActionTypes.LOAD)  //筛选什么样的action
    .map(toPayload)
    .switchMap(_ => this.service$.getQuote()
      .map(q => new actions.LoadSuccessAction(q))
      .catch(err => Observable.of(new actions.LoadFailAction(JSON.stringify(err)))) // 捕获到异常
    );

  constructor(private action$: Actions, private service$: QuoteService) {}
}