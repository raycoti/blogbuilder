import {SET_DRAFT} from '../constants';

const initialState = {
  text: '',
}

export default function(state=initialState, action){
  const newState = Object.assign({}, state);
  switch(action.type){
    case SET_DRAFT:
      newState.text = action.text;
      break;
    default:
      return state;
  }
  return newState;
}