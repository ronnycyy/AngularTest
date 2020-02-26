import * as actions from '../actions/quote.action';     //导入动作类型
import { Quote } from '../domain/quote.model';

export interface State {
	quote: Quote
};

export const initialState: State = {
	quote: {
    cn: '满足感在于不断的努力，而不是现有成就。全心努力定会胜利满满。',
    en: 'Satisfaction lies in constant effort, not existing achievements. Work hard and you will win.',
    pic: 'assets/img/quote_fallback.jpg',
  }
};

/**
 * 
 * @param state 现在的状态
 * @param action 想要进行的动作
 * 
 * 返回新的状态
 */
export function reducer(state = initialState, action: actions.Actions): State {
		switch (action.type) {
				case actions.ActionTypes.LOAD_SUCCESS: {
						return {...state, quote: <Quote>action.payload};  //不会去改原来的state，只会去做新的state
				}
				// 失败和默认情况一样，都会返回一个原有的状态
				case actions.ActionTypes.LOAD_FAIL:
				default: {
						return state;
				}
		}
}

export const getQuote = (state: State) => state.quote;