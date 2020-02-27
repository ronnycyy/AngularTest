import { NgModule } from '@angular/core';
import { StoreModule, combineReducers, ActionReducer } from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
import { compose } from '@ngrx/core/compose';
import { createSelector } from 'reselect';

import * as fromQuote from './quote.reducer';
import * as fromAuth from './auth.reducer';
import * as fromProject from './project.reducer';
import * as fromTaskList from './task-list.reducer';

import { environment } from '../../../AngularTest/src/environments/environment';
import { Auth } from 'app/domain/auth.model';


export interface State {
  quote: fromQuote.State;
  auth: Auth;
  projects: fromProject.State;
  taskLists: fromTaskList.State;
};

const initialState: State = {
  quote: fromQuote.initialState,
  auth: fromAuth.initialState,
  projects: fromProject.initialState,
  taskLists: fromTaskList.initialState,
};

const reducers = {
  quote: fromQuote.reducer,
  auth: fromAuth.reducer,
  projects: fromProject.reducer,
  taskLists: fromTaskList.reducer,
};

// 我们的所有reducer返回的都是state
const productionReducers: ActionReducer<State> = combineReducers(reducers);    //生产环境
const developmentReducers: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers); // 开发环境

export function reducer(state = initialState, action: {type: string; payload: any} ): State {
  return environment.production ? productionReducers(state, action) : developmentReducers(state, action);
}

export const getQuoteState = (state: State) => state.quote;
export const getAuthState = (state: State) => state.auth;
export const getProjectState = (state: State) => state.projects;
export const getTaskListState = (state: State) => state.taskLists;

export const getQuote = createSelector(getQuoteState, fromQuote.getQuote);
export const getProjects = createSelector(getProjectState, fromProject.getAll);
export const getTaskLists = createSelector(getTaskListState, fromTaskList.getSelected);

@NgModule({
  imports: [
    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
  ]
})
export class AppStoreModule {}