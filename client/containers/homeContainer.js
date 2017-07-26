import { connect } from 'react-redux';
import React, { Component } from 'react';

class HomeContainer extends Component {
  constructor() {
    super()
  }
  componentWillMount() {
    console.log('hi')
  }
  render() {
    return (
      <div className="container-fluid" >
        <div className="col-md-12">
          <h1>Welcome</h1>

        </div>
      </div>
    )
  }
}

//export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)

export default HomeContainer;
