import * as actions from '../actions/task-list.action';
import * as prjActions from '../actions/project.action';
import { Project, TaskList } from 'app/domain';
import * as _ from 'lodash';
import { createSelector } from 'reselect';

export interface State {
  ids: string[];  
  entities: {[id: string]: TaskList}; 
  selectedIds: string[];     
};

export const initialState: State = {
  ids: [],
  entities: {},
  selectedIds: [],    
};

const addTaskList = (state, action) => {
  const taskList = action.payload;   // add的时候action的payload携带的是TaskList对象
  if(state.entities[taskList.id]) {
    // 如果新增的项目，已存在原有项目列表中，返回原状态
    return state;
  }
  const newIds = [...state.ids, taskList.id];   //将taskList.id作为元素，添加到state.ids数组中
  const newEntities = {...state.entities, [taskList.id]: taskList};   //将字典(放着很多项目id和对应的项目)打散，加入一个属性[taskList.id]，值为taskList（新项目）
  return {...state, ids: newIds, entities: newEntities}
}

const updateTaskList = (state, action) => {
  const taskList = action.payload;
  const newEntities = {...state.entities, [taskList.id]: taskList};
  return {...state, entities: newEntities}
}

const deleteTaskList = (state, action) => {
  const taskList = action.payload;
  const newIds = state.ids.filter(id => id !== taskList.id);    //把不同于taskList.id的项过滤出来，形成一个新数组
  const newEntities = newIds.reduce((entities, id: string) => ({...entities, [id]: state.entities[id]}), {});
  const newSelectedIds = state.selectedId.filter(id => id !== taskList.id);
  return {
    ids: newIds,
    entities: newEntities,
    selectedIds: newSelectedIds,
  };
}

const loadTaskLists = (state, action) => {
  const taskLists = action.payload;
  const incomingIds = taskLists.map(p => p.id);
  const newIds = _.difference(incomingIds, state.ids);
  const incomingEntities = _.chain(taskLists)
    .keyBy('id')
    .mapValues(o => o)
    .value();
  const newEntities: Object = newIds.reduce((entities: Object, id: string) => ({...entities, [id]: incomingEntities[id]}), {});
  return {
    ...state,    //返回原有state中的selectedIds
    ids: [...state.ids, ...newIds],
    entities: {...state.entities, ...newEntities},
  };
}

const swapTaskLists = (state, action) => {
  const taskLists = <TaskList[]>action.payload;
  const updatedEntities = _.chain(taskLists)
    .keyBy('id')
    .mapValues(o => o)
    .value();
  const newEntities = {...state.entities, ...updatedEntities};
  return {
    ...state,
    entities: newEntities
  };
}

const selectPrj = (state, action) => {
  const selected = <Project>action.payload;
  const selectedIds = state.ids.filter(id => state.entities[id].projectId === selected.id);
  return {
    ...state,
    selectedIds: selectedIds
  }
}

const delListsByPrj = (state, action) => {
  const project = <Project>action.payload;
  const taskListIds = project.taskLists;
  const remainingIds = _.difference(state.ids, taskListIds);
  const remainingEntities = remainingIds.reduce((entities, id) => ({...entities, [id]: state.entities[id]}), {});
  return {
    ids: [...remainingIds],
    entities: remainingEntities,
    selectedIds: []
  }
}

export function reducer(state = initialState, action: actions.Actions | prjActions.Actions ): State {
  switch (action.type) {
    case actions.ActionTypes.ADD_SUCCESS: {
      return addTaskList(state, action);
    }
    case actions.ActionTypes.DELETE_SUCCESS: {
      return deleteTaskList(state, action);
    }
    case actions.ActionTypes.UPDATE_SUCCESS: {
      return updateTaskList(state, action);
    }
    case actions.ActionTypes.LOAD_SUCCESS: {
      return loadTaskLists(state, action);
    }
    case actions.ActionTypes.SWAP_SUCCESS: {
      return swapTaskLists(state, action);
    }
    case prjActions.ActionTypes.SELECT_PROJECT: {
      return selectPrj(state, action);
    }
    case prjActions.ActionTypes.DELETE_SUCCESS: {
      return delListsByPrj(state, action);
    } 

    default: {
      return state;
    }
  }
}


export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;
export const getSelectedIds = (state: State) => state.selectedIds;

/** 整体的以taskList为元素的数组 */
export const getSelected = createSelector(getIds, getEntities, (ids, entities) => {
  return ids.map(id => entities[id]);
})