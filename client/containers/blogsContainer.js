import { connect } from 'react-redux';
import React, { Component } from 'react';
import { getBlogs, deleteBlogById } from '../actionCreators/blog';
import Blogs from '../components/blogs';

const mapStateToProps = (state) => {
  return {
    blogs: state.blog.blogs,
    user: state.user.id,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBlogs(authorId) {
      dispatch(getBlogs(authorId))
    },
    deleteBlog(blogId) {
      dispatch(deleteBlogById(blogId))
    }
  }
}

class BlogsContainer extends Component {
  componentDidMount() {
    this.props.getBlogs();
  }

  render() {
    return (
      <div>
        <Blogs deleteBlog={this.props.deleteBlog} blogs={this.props.blogs} user={this.props.user} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogsContainer);
