const LoginForm = ({
   handleLogin,
   handleUsernameChange,
   handlePasswordChange,
   username,
   password
})=> (
  
    <form onSubmit={handleLogin}>
       <h1>Log in to application</h1>
       <div>
         UserName:
         <input
           type='text'
           value={username}
           name="userName"
           //({target})=>setUsername(target.value)
           onChange={handleUsernameChange}
         />
       </div>
 
       <div>
         Password:
         <input
           type='password'
           value={password}
           name='password'
           //({target})=>{setPassword(target.value)}
           onChange={handlePasswordChange}
         />
       </div>
 
       <button type='submit'>login</button>
     </form>
)

export default LoginForm