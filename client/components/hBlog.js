import React from 'react';
const HBlog = function ({ inner, header }) {
  return (
    <h3 dangerouslySetInnerHTML={inner(header)} className="des"></h3>
  )
}

export default HBlog;
