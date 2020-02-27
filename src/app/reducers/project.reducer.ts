import * as actions from '../actions/project.action';
import { Project } from 'app/domain';
import * as _ from 'lodash';
import { createSelector } from 'reselect';

export interface State {
  ids: string[];    //所有项目的id
  entities: {[id: string]: Project};   //id -> project 形成的所有项目的字典
  selectedId: string | null;     
};

export const initialState: State = {
  ids: [],
  entities: {},
  selectedId: null,    
};

const addProject = (state, action) => {
  const project = action.payload;   // add的时候action的payload携带的是Project对象
  if(state.entities[project.id]) {
    // 如果新增的项目，已存在原有项目列表中，返回原状态
    return state;
  }
  const newIds = [...state.ids, project.id];   //将project.id作为元素，添加到state.ids数组中
  const newEntities = {...state.entities, [project.id]: project};   //将字典(放着很多项目id和对应的项目)打散，加入一个属性[project.id]，值为project（新项目）
  return {...state, ids: newIds, entities: newEntities}
}

const updateProject = (state, action) => {
  const project = action.payload;
  const newEntities = {...state.entities, [project.id]: project};
  return {...state, entities: newEntities}
}

const deleteProject = (state, action) => {
  const project = action.payload;
  const newIds = state.ids.filter(id => id !== project.id);    //把不同于project.id的项过滤出来，形成一个新数组
  const newEntities = newIds.reduce((entities, id: string) => ({...entities, [id]: state.entities[id]}), {});
  return {
    ids: newIds,
    entities: newEntities,
    selectedId: null
  };
}

const loadProjects = (state, action) => {
  const projects = action.payload;
  const incomingIds = projects.map(p => p.id);
  const newIds = _.difference(incomingIds, state.ids);
  const incomingEntities = _.chain(projects)
    .keyBy('id')
    .mapValues(o => o)
    .value();
  const newEntities: Object = newIds.reduce((entities: Object, id: string) => ({...entities, [id]: incomingEntities[id]}), {});
  return {
    ids: [...state.ids, ...newIds],
    entities: {...state.entities, ...newEntities},
    selectedId: null
  };
}

export function reducer(state = initialState, action: actions.Actions ): State {
  switch (action.type) {
    case actions.ActionTypes.ADD_SUCCESS: {
      return addProject(state, action);
    }
    case actions.ActionTypes.DELETE_SUCCESS: {
      return deleteProject(state, action);
    }
    case actions.ActionTypes.INVITE_SUCCESS:
    case actions.ActionTypes.UPDATE_SUCCESS: {
      return updateProject(state, action);
    }
    case actions.ActionTypes.LOAD_SUCCESS: {
      return loadProjects(state, action);
    }
    case actions.ActionTypes.SELECT_PROJECT: {
      return {...state, selectedId:(<Project>action.payload).id};
    }

    default: {
      return state;
    }
  }
}


export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;
export const getSelectedId = (state: State) => state.selectedId;

/** 整体的以project为元素的数组 */
export const getAll = createSelector(getIds, getEntities, (ids, entities) => {
  return ids.map(id => entities[id]);
})