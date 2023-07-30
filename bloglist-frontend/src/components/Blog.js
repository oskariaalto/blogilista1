import PropTypes from 'prop-types'
import { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)

  const text = visible
    ? 'hide'
    : 'show'

  const show = { display : visible ? '' : 'none' }

  const visibility = () => {
    setVisible(!visible)
  }

  const handleLike = (event) => {
    event.preventDefault()
    const copy = { ...blog }
    copy.likes +=1
    addLike(copy)
  }

  const handleDelete = (event) => {
    event.preventDefault()
    removeBlog(blog)
  }
  const user = blog.user
    ? blog.user.name
    : undefined

  return(
    <div style={blogStyle} id='blog' className='blog'>
      <div>
        {blog.title} {blog.author}
        <button onClick={visibility} id ='show-button'>{text}</button>
      </div>
      <div style={show} className='showContent'>
        <div>{blog.url}</div>
        <div>
              likes {blog.likes}
          <button onClick={handleLike} id='like-button'>like</button>
        </div>
        <div>{user}</div>
        <div>
          <button onClick={handleDelete} id='remove-button'>remove</button>
        </div>
      </div>
    </div>
  )
}

Blog.PropTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog