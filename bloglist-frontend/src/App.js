import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import { setToken, create, getAll, update, remove } from './services/blogs'
import { login } from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notif, setNotif] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUser){
      const user = JSON.parse(loggedUser)
      setUser(user)
      setToken(user.token)
    }
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
      setToken(user.setToken)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setNotif('notification')
      setMessage('logged in')
      setTimeout(() => {
        setMessage(null)
        setNotif(null)
      },3000)
    } catch(exception) {
      setNotif('error')
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
        setNotif(null)
      },3000)
    }
  }

  const addBlog = async (newObject) => {
    blogFormRef.current.visibility()
    const newBlog = await create(newObject)
    setBlogs(blogs.concat(newBlog))
    setNotif('notification')
    setMessage(`a new blog ${newObject.title} ${newObject.author} added`)
    setTimeout(() => {
      setMessage(null)
      setNotif(null)
    },3000)
  }

  const logOut = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setNotif('error')
    setMessage(`logged out as ${user.name}`)
    setTimeout(() => {
      setMessage(null)
      setNotif(null)
    },2000)
    setUser(null)
  }

  const addlike = async (upObject) => {
    console.log(upObject)
    await update(upObject)
    setBlogs(blogs.map(blog => blog.id!==upObject.id ?blog : upObject))
  }

  const removeBlog = async (rmObject) => {
    if (window.confirm(`Remove blog ${rmObject.title} by ${rmObject.author}`)){
      await remove(rmObject.id)
      setBlogs(blogs.filter(b => b.id!==rmObject.id))
    }
  }

  const compLikes = (a, b) => {
    return b.likes-a.likes
  }

  const blogFormRef = useRef()

  if (user === null) {
    return (
      <LoginForm
        handleLogin = {handleLogin}
        handleUsernameChange = {({ target }) => setUsername(target.value)}
        handlePasswordChange = {({ target }) => setPassword(target.value)}
        username = {username}
        password = {password}
        message  = {message}
        notif = {notif}
      />
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <div className={notif}>{message}</div>

      <div>
        {user.name} logged in
        <button onClick={logOut}>logout</button>
      </div>
      <div>
        <Togglable buttonLable = 'new blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </div>
      <div>
        {blogs.sort(compLikes).map(blog =>
          <Blog key={blog.id} blog={blog} addLike={addlike} removeBlog={removeBlog}/>
        )}
      </div>
    </div>
  )
}

export default App
