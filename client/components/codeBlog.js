import React from 'react';
const CodeBlog = function ({ text }) {
  text = text.replace(/&lt;/g, '<')
  text = text.replace(/&gt;/g, '>')
  return (
    <pre className="des">{text}</pre>
  )
}

export default CodeBlog;
