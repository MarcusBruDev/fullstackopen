import { useState ,forwardRef,useImperativeHandle} from "react";


const Blog = ({ blog ,toggleLike,username,handleRemove,userBd}) => {

  const [visibleAllTheDetails,setVisibleAllTheDetails]= useState(false)
  
  const hideWhenVisible = {display : visibleAllTheDetails ? 'none':''}
  const showWhenVisible = {display: visibleAllTheDetails ? '' :'none'}


  const toggleVisibility =()=>{
    setVisibleAllTheDetails(!visibleAllTheDetails)
  }


  console.log("username ",username)
  console.log("userBd ",userBd)
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }



  return(
    <>
 
      - {blog.likes}


      <div style={blogStyle}>
          <div >
            {blog.title} 
            <button className="view-button" onClick={toggleVisibility}>view</button>
         </div>  

        
      </div> 
      
      <div style={showWhenVisible}>
          <div  className="blog-details" style={blogStyle}>
            
            {blog.url} <button className="hide-button" onClick={toggleVisibility}>hide</button><br />
            {blog.likes} <button className="like-button" onClick={toggleLike}>like</button><br />
            {blog.author}   <br />
            {blog.user.username === username ? <button className="cancel-button" onClick={handleRemove}>Remove</button> : null}
            
          </div>
          
      </div>
      

      
      
    </>


  )

}

export default Blog