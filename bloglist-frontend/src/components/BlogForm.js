import PropTypes from 'prop-types'
import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return(
    <div className='formDiv'>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
            title:
          <input type ="text" value= {title} name= "Title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder='write title here' id = 'title'/>
        </div>
        <div>
            author:
          <input type ="text" value= {author} name= "Author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder='write author here' id = 'author'/>
        </div>
        <div>
            url:
          <input type ="text" value= {url} name= "Url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder='write url here' id = 'url'/>
        </div>
        <button type='submit' id='create-button'>create</button>
      </form>
    </div>
  )
}

BlogForm.PropTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm