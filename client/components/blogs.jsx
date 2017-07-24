import React from 'react';
import { Link } from 'react-router-dom';

const Blogs = function ({ blogs, deleteBlog }) {
  return (
    <div className="container" >
      {blogs.map(blog => {
        return (
          <div className="row blog" key={blog.id} >
            <Link to={`blog/${blog.id}`}>
              <div className='col-xs-6 col-md-6 link' >{blog.name}</div>
            </Link>
            <Link to={`draft/${blog.id}`}>
              <div className='col-xs-3 col-md-3 link' >EDIT</div>
            </Link>
            <button onClick={() => deleteBlog(blog.id)}>Delete</button>
          </div>
        )
      })}
    </div>
  )
}

export default Blogs;
