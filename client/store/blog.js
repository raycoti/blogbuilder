import { DELETE_BLOG, LOAD_BLOG, LOAD_BLOGS, SET_START, SET_CURRENT, SET_NAME } from '../constants';

const initialState = {
  html: '',
  indexes: [],
  types: [],
  current: -1,
  name: '',
  blogs: [],
}

export default function (state = initialState, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case LOAD_BLOG:
      newState.html = action.html;
      break;
    case DELETE_BLOG:
      newState.blogs = [...newState.blogs].filter(blog=>{
        return blog.id !== action.blogId;
      })
      break
    case LOAD_BLOGS:
      newState.blogs = action.blogs;
      break;
    case SET_START:
      newState.indexes = action.indexes;
      newState.types = action.types;
      break;
    case SET_CURRENT:
      newState.current = action.id;
      break;
    case SET_NAME:
      newState.name = action.name;
      break;
    default:
      return state;
  }
  return newState;
}