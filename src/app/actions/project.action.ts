import { Action } from '@ngrx/store';
import { type } from '../utils/type.util';
import { User } from '../../../AngularTest/src/app/domain';
import { Project } from 'app/domain';

/** 增删改查 邀请组员 */
export const ActionTypes = {
  ADD:         type('[Project] Add'),
  ADD_SUCCESS: type('[Project] Add Success'),
  ADD_FAIL:    type('[Project] Add Fail'),
  DELETE:         type('[Project] Delete'),
  DELETE_SUCCESS: type('[Project] Delete Success'),
  DELETE_FAIL:    type('[Project] Delete Fail'),
  UPDATE:         type('[Project] Update'),
  UPDATE_SUCCESS: type('[Project] Update Success'),
  UPDATE_FAIL:    type('[Project] Update Fail'),
  LOAD:         type('[Project] Load'),
  LOAD_SUCCESS: type('[Project] Load Success'),
  LOAD_FAIL:    type('[Project] Load Fail'),
  INVITE:         type('[Project] Invite'),
  INVITE_SUCCESS: type('[Project] Invite Success'),
  INVITE_FAIL:    type('[Project] Invite Fail'),
  SELECT_PROJECT:    type('[Project] Select Project'),
};

/** 新增项目 */
export class AddAction implements Action {
  type = ActionTypes.ADD;

  constructor(public payload: Project) { }
}

export class AddSuccessAction implements Action {
  type = ActionTypes.ADD_SUCCESS;

  constructor(public payload: Project) { }
}

export class AddFailAction implements Action {
  type = ActionTypes.ADD_FAIL;

  constructor(public payload: string) { }
}


/** 删除项目 */
export class DeleteAction implements Action {
  type = ActionTypes.DELETE;

  constructor(public payload: Project) { }
}

export class DeleteSuccessAction implements Action {
  type = ActionTypes.DELETE_SUCCESS;

  constructor(public payload: Project) { }
}

export class DeleteFailAction implements Action {
  type = ActionTypes.DELETE_FAIL;

  constructor(public payload: string) { }
}


/** 更改项目 */
export class UpdateAction implements Action {
  type = ActionTypes.UPDATE;

  constructor(public payload: Project) { }
}

export class UpdateSuccessAction implements Action {
  type = ActionTypes.UPDATE_SUCCESS;

  constructor(public payload: Project) { }
}

export class UpdateFailAction implements Action {
  type = ActionTypes.UPDATE_FAIL;

  constructor(public payload: string) { }
}


/** 查询项目 */
export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload: null) { }
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: Project[]) { }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;

  constructor(public payload: string) { }
}


/** 邀请组员 */
export class InviteAction implements Action {
  type = ActionTypes.INVITE;

  constructor(public payload: {projectId: string; members: User[] }) { }
}

export class InviteSuccessAction implements Action {
  type = ActionTypes.INVITE_SUCCESS;

  constructor(public payload: Project) { }
}

export class InviteFailAction implements Action {
  type = ActionTypes.INVITE_FAIL;

  constructor(public payload: string) { }
}



/** 选择项目 */
export class SelectAction implements Action {
  type = ActionTypes.SELECT_PROJECT;

  constructor(public payload: Project) { }
}



/** 导出所有类型 */
export type Actions
  = AddAction
  | AddSuccessAction
  | AddFailAction
  | DeleteAction
  | DeleteSuccessAction
  | DeleteFailAction
  | UpdateAction
  | UpdateSuccessAction
  | UpdateFailAction
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction
  | InviteAction
  | InviteSuccessAction
  | InviteFailAction
  | SelectAction;