import { SET_DRAFT, DELETE_BLOG, LOAD_BLOG, LOAD_BLOGS, SET_START, SET_CURRENT, SET_NAME } from '../constants';
import axios from 'axios';
import getIndexes from '../parserFunction.js'
export const setDraft = (text) => ({
  type: SET_DRAFT,
  text
})

export const deleteBlog = (blogId) => ({
  type: DELETE_BLOG,
  blogId
})

export const setCurrent = (id) => ({
  type: SET_CURRENT,
  id,
})

export const loadBlog = (html) => ({
  type: LOAD_BLOG,
  html
})

export const setName = (name) => ({
  type: SET_NAME,
  name
})

export const setStart = (indexes, types) => ({
  type: SET_START,
  indexes,
  types,
})

export const loadBlogs = (blogs) => ({
  type: LOAD_BLOGS,
  blogs
})

export const deleteBlogById = (id) => {
  return dispatch => {
    return axios.delete(`/api/blogs/${id}`)
      .then(() => dispatch(deleteBlog(id)))
      .catch(console.err)
  }
}

export const getBlogs = author => {
  const id = author || '';
  return dispatch => {
    return axios.get(`/api/blogs?author=${id}`)
      .then(result => {
        const blogs = result.data;
        dispatch(loadBlogs(blogs))
      })
  }
}

export const loadDraft = (id, func) => {
  return dispatch => {
    dispatch(setCurrent(+id))
    return axios.get(`/api/blogs/${id}`)
      .then(result => {
        const name = result.data.name;
        const text = result.data.body;
        dispatch(setName(name));
        dispatch(setDraft(text));
        func(text, name)
      })
  }
}

export const getBlogPost = (id) => {
  return (dispatch) => {
    return axios.get(`/api/blogs/${id}`)
      .then(result => {
        var html = result.data.body || '<h1>No draft</h1>';
        html = html.replace(/<br>/g, '')
        html = html.replace(/<img/g, '<img class="img-thumbnail" ')
        dispatch(loadBlog(html))
        dispatch(parser(html))
        dispatch(setName(result.data.name))
      })
  }
}



export const parser = (html) => {
  return (dispatch) => {
    const { indexes, types } = getIndexes(html);
    dispatch(setStart(indexes, types));
  }
  //this.props.set(indexes,types)
}

export const saveOrUpdate = (text, id, name) => {
  if (!name || !name.length) {
    name = 'anon'
  }
  return (dispatch) => {
    if (id) {
      axios.put(`/api/blogs/${id}`, { body: text, name: name })
        .then(() => {
          dispatch(setCurrent(id))
        })
    }
    else {
      dispatch(save(text, name))
    }
  }
}


export const save = (text, name) => {
  return (dispatch) => {
    axios.post('/api/blogs', { body: text, name: name })
      .then(blog => dispatch(setCurrent(blog.data.id)))
  }
}