import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notificacion from './components/Notificacion'  
import { use } from 'react'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)  
  const [newBlog, setNewBlog] = useState({'title':'','author':'','url':''})
  const [sussessMessage, setSuccessMessage] = useState(null)
  const [newBlogVisible, setNewBlogVisible] = useState(false)
  



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      
    }
  }, [])

  const handleLogin = async (event) => {

    event.preventDefault()

    try{
      const user = await loginService.login({username, password})
    
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }catch(exeption){
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout= async ()=>{
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }


  const handleNewBlog= async (event)=>{
    event.preventDefault()


    const blogObject={
      title:newBlog.title,
      author:newBlog.author,
      url:newBlog.url 
    }

    try{
      const returnedBlog= await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNewBlog({title:'',author:'',url:''})
      setSuccessMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

    }catch(exception){
      setErrorMessage('error creating blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    setNewBlog({title:'',author:'',url:''})
  }

  const loginForm =()=>(
  
   <form onSubmit={handleLogin}>
      <h1>Log in to application</h1>
      <div>
        UserName:
        <input
          type='text'
          value={username}
          name="userName"
          onChange={({target})=>setUsername(target.value)}
        />
      </div>

      <div>
        Password:
        <input
          type='password'
          value={password}
          name='password'
          onChange={({target})=>{setPassword(target.value)}}
        />
      </div>

      <button type='submit'>login</button>
    </form>
  )


  const createNewBlog=()=>(
    <form onSubmit={handleNewBlog}>
      <h1>Create new Blog</h1>
      <div>
        Tittle:
        <input
        type='text'
        value={newBlog.title}
        name='tittle'
        onChange={({target})=>setNewBlog({...newBlog, title:target.value})}
        />
      </div>
      <div>
        Author:
        <input
        type='text'
        value={newBlog.author}
        name='author'
        onChange={({target})=>setNewBlog({...newBlog, author:target.value})}
        />
      </div>
      <div>
        Url:
        <input
        type='text'
        value={newBlog.url}
        name='url'
        onChange={({target})=>setNewBlog({...newBlog, url:target.value})}
        />
      </div>
      <button type='submit'>create</button>


    </form>
 
  )




  return (
    <div>
     
      {errorMessage ? <Notificacion messageError={errorMessage} /> : null}
      {sussessMessage ? <Notificacion messageSussess={sussessMessage} /> : null}  

      {user === null 
      ? loginForm()
      : <div>
        
        <h1>Blogs</h1>
        
        
        
        <div>
          {user.name} logged in <button onClick={handleLogout}>Logout</button>
        </div> <br />


        <div>{createNewBlog()}</div> <br /><br />

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        
        </div>
      
      
      
      }
      

    </div>
  )
}

export default App