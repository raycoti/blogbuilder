import React from 'react';
const PBlog = function ({ paragraph, inner }) {
  return (
    <p className="des" dangerouslySetInnerHTML={inner(paragraph)}></p>
  )
}

export default PBlog;