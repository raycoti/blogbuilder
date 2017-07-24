import React, { Component } from 'react';
const Root = function({children,location}) {
  const name=location.pathname;
    return (
      <div>
        <div className="container-fluid">
          {children}
        </div>
      </div>
    )
  }

export default Root;
