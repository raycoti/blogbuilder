import ReactQuill from 'react-quill'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadDraft, setDraft, saveOrUpdate, setName, setCurrent } from '../actionCreators/blog'
import { Link } from 'react-router-dom';
import axios from 'axios';
const mapStateToProps = (state) => {
  return {
    text: state.draft.text,
    current: state.blog.current,
    name: state.blog.name,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    save(text, name) {
      if (!name || !name.length) name = 'anon';
      dispatch(setDraft(text))
      dispatch(setName(name))
    },
    saveOrUpdate(text, id, name) {
      if (!name || !name.length) name = 'anon';
      dispatch(saveOrUpdate(text, id, name))
      dispatch(setName(name))
    },
    setName(name) {
      dispatch(setName(name))
    },
    load(id, func) {
      dispatch(loadDraft(id, func))
    },
    loadNew() {
      dispatch(setCurrent(-1))
      dispatch(setName(''))
      dispatch(setDraft(''))
    }
  }
}


class BloggerContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { text: '', name: 'anon' }
    this.handleChange = this.handleChange.bind(this)
    this.clickHandler = this.clickHandler.bind(this);
    this.save = this.save.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleName = this.handleName.bind(this)
    this.setDraft = this.setDraft.bind(this);
    this.handleMatch = this.handleMatch.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log('hello')
    this.props.setName(this.state.name);
  }

  handleChange(value) {
    this.setState({ text: value })
  }
  handleName(e) {
    const name = e.target.value
    console.log(name)
    this.setState({ name: name })
  }
  clickHandler(e) {
    this.props.save(this.state.text, this.state.name);
  }
  save(e) {
    var id = this.props.current;
    if (id === -1) id = false;
    this.props.saveOrUpdate(this.state.text, id, this.state.name)
  }

  componentDidMount() {
    const params = this.props.match.params;
    this.handleMatch(params)

  }

  handleMatch(params) {
    if (Object.keys(params).length) {
      const id = params.id;
      this.props.load(id, this.setDraft)
    }
    else {
      this.props.loadNew();
      this.setDraft('', '')
    }
  }

  componentWillReceiveProps(nextProps) {
    const currentId = +nextProps.match.params.id || -1;
    if (nextProps.current !== currentId) {
      const params = nextProps.match.params;
      this.handleMatch(params)
    }
  }

  setDraft(text, name) {
    this.setState({
      text: text,
      name: name,
    })
  }

  render() {
    return (
      <div className="container-fluid" >
        <div className="col-lg-12 myEditor">
          <ReactQuill
            value={this.state.text}
            onChange={this.handleChange}
            modules={BloggerContainer.modules}
            formats={BloggerContainer.formats}
          />

        </div>
        <div className="col-lg-12 post" >
          <form onSubmit={this.handleSubmit}>
            <input value={this.state.name} onChange={this.handleName} />
            <button type="submit">Save Name</button>
          </form>
          <button onClick={this.save}>Save</button>
          <Link to='/preview' ><button onClick={this.clickHandler}>Preview</button></Link>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BloggerContainer);

BloggerContainer.modules = {
  toolbar: [
    [{ 'header': '1' }, { 'font': ['Sans Serif'] }],
    [{ size: ['normal'] }],
    ['bold', 'italic', 'underline'],
    [],
    ['link', 'image', 'code-block'],
    ['clean']
  ],

}

BloggerContainer.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike',
  'link', 'image', 'code-block',
]
