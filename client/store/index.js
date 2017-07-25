import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import blog from './blog'
import draft from './newBlog'
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({user, blog, draft})
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({collapsed: true})))
let store = createStore(reducer, middleware);

if (process.env.NODE_ENV === 'production') {
  store = createStore(reducer, applyMiddleware(thunkMiddleware));
}

export default store
export * from './user'
