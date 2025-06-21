import { useState, useEffect,useRef  } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notificacion from './components/Notificacion'  
import Togglable from './components/Togglable'
import CreateNewBlog from './components/CreateNewBlog'
import LoginForm from './components/LoginForm'
import { use } from 'react'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [usersBd, setUsersBd] = useState([])
  const [likes, setLikes] = useState(0)
  const [username, setUsername] = useState('')
  const[userBd, setUserBd] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)  
  const [newBlog, setNewBlog] = useState({'title':'','author':'','url':''})
  const [sussessMessage, setSuccessMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  
  

  const noteFormRef = useRef();



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  


    blogService.getAllUser().then(users => {
      setUsersBd(users)
    })
  }, [])




  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  


  }, [sussessMessage,likes])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    const loggedUserBdJSON = window.localStorage.getItem('loggedUserbd')

    
    if (loggedUserBdJSON) { 
      const userBd = JSON.parse(loggedUserBdJSON)
      setUserBd(userBd)       
    }
    
  

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
      console.log(user.username) // usuario logueado
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
    window.localStorage.removeItem('loggedUserbd')
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

      
      console.log(blogs)


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
    noteFormRef.current.toggleVisibility() // Oculta el formulario de creación de blog después de enviar
   
  }


  const handleRemove = async (id) => {
    const blog = blogs.find(b => b.id === id)    
    
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {

      try{
        await blogService.deleteBlog(id)
        setBlogs(blogs.filter(b=> b.id !== id))
        setSuccessMessage(`Blog ${blog.title} by ${blog.author} removed`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      }catch (exception) {
        setErrorMessage('error liking blog')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
      
    }
  }

  


  const loginForm =()=>{
    const hideWhenVisible ={display: loginVisible ? 'none' : ''}
    const showWhenVisible = {display: loginVisible ? '' : 'none'}

    return(
      <>


        <div style={hideWhenVisible}>
          <button onClick={()=>setLoginVisible(true)}>Log in</button>
        </div>



        <div style={showWhenVisible}>
          <LoginForm 
          username={username} 
          password={password} 
          handleLogin={handleLogin} 
          handleUsernameChange={({target})=>{setUsername(target.value)}}
          handlePasswordChange={({target})=>{setPassword(target.value)}} >
          </LoginForm>
  
          <button onClick={()=>setLoginVisible(false)}>Cancel</button>
        </div>
      </>




    )

  }

  
    const toggleLike = async (id) => {

  
      const blog = blogs.find(b => b.id === id) 
       
      console.log("blogs ", blogs)

    
      const updatedBlog = { ...blog, likes: blog.likes + 1  }



      try {
        const returnedBlog = await blogService.update(id, updatedBlog)
        setBlogs(blogs.map(b => b.id !== id ? b : returnedBlog))
        setLikes(likes + 1)
    
      } catch (exception) {
        setErrorMessage('error liking blog')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
 


  
    const createNewBlog = () => (
      <Togglable buttonLabel='Create new blog'  ref={noteFormRef}>
        <CreateNewBlog 
        title={newBlog.title}
        author={newBlog.author}
        url={newBlog.url}
        handleNewBlog={handleNewBlog}
        handleTitleChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
        handleAuthorChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
        handleUrlChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
         />
      </Togglable>
    )
    




  return (
    <div >
     
      {errorMessage ? <Notificacion messageError={errorMessage} /> : null}
      {sussessMessage ? <Notificacion messageSussess={sussessMessage} /> : null}  

      {user === null
      ? loginForm()
      : <div id="container">
        
        <h1>Blogs</h1>
        
        
        
        <div>
          {user.username} logged in <button onClick={handleLogout}>Logout</button>
        </div> <br />


        <div>{createNewBlog()}</div> <br /><br />

        {blogs.sort((a,b)=>b.likes - a.likes).map(blog =>
                  <Blog key={blog.id} blog={blog} toggleLike={()=>toggleLike(blog.id)}  handleRemove={()=>handleRemove(blog.id)} username={user.username} userBd={blog.user.username}/>
        )}
        
        </div>
      
        
      
      }
      

    </div>
  )
}

export default App