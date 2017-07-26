import { connect } from 'react-redux';
import React, { Component } from 'react';
import PBlog from '../components/pBlog';
import HBlog from '../components/hBlog';
import CodeBlog from '../components/codeBlog'
import { loadBlog, parser, getBlogPost } from '../actionCreators/blog';

const mapStateToProps = (state) => {
  return {
    html: state.blog.html,
    indexes: state.blog.indexes,
    types: state.blog.types,
    text: state.draft.text,
    name: state.blog.name,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    load(html) {
      dispatch(loadBlog(html))
    },
    parse(indexes, types) {

      return Promise.resolve(dispatch(parser(indexes, types)))

    },
    getBlog(id) {
      return Promise.resolve(dispatch(getBlogPost(id)))
    }
  }
}

class BlogPostContainer extends Component {
  constructor() {
    super();
  }

  createMarkup(string) {
    return { __html: string };
  }

  componentWillMount() {
    const url = this.props.match.url;

    const html = '<p><strong><em><u>hello </u></em></strong></p>';
    //whether or not to load from database;
    const id = this.props.match.params.id
    if (url.includes('/blog') && id) {
      this.props.getBlog(id);
    }
    else if (this.props.text != '') {
      this.props.load(this.props.text);
      this.props.parse(this.props.text);
    }
    else {
      this.props.load('<h1>No draft</h1>');
      this.props.parse('<h1>No draft</h1>');
    }

  }


  render() {

    const html = this.props.html;
    const indexes = this.props.indexes;
    const types = this.props.types;
    const name = this.props.name;
    let prev = 0;

    return (
      <div className="container-fluid" >
        <div className="blogg" >
          <h1>{name}</h1>
          <hr />
          {indexes.map((index, i) => {
            const theString = html.substring(index.s, index.e);

            switch (types[i]) {
              case '<p>':
                return <PBlog inner={this.createMarkup} key={i} paragraph={theString} />;
              case '<h1>':
                return <HBlog key={i} inner={this.createMarkup} header={theString} />;
              case '<pre class="ql-syntax" spellcheck="false">':
                return <CodeBlog key={i} text={theString} />
              default:
                return null;
            }
          })}
        </div>
      </div>
    )
  }




}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPostContainer);