import { useState ,forwardRef,useImperativeHandle} from "react";


const Blog = ({ blog ,toggleLike,username,handleRemove,userBd}) => {

  const [visibleAllTheDetails,setVisibleAllTheDetails]= useState(false)
  
  const hideWhenVisible = {display : visibleAllTheDetails ? 'none':''}
  const showWhenVisible = {display: visibleAllTheDetails ? '' :'none'}


  const toggleVisibility =()=>{
    setVisibleAllTheDetails(!visibleAllTheDetails)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }



  return(
    <>

      <div style={blogStyle}>
          <div  >
            <div className="likes">{blog.likes}</div> 
            <span className="title">{blog.title}</span>
            <button className="view-button" onClick={toggleVisibility}>view</button>
         </div>  
      </div> 
      
      <div style={showWhenVisible}>
          <div  className="blog-details" style={blogStyle}>
            
            {blog.url ? <div  className="url"><span className="url">{blog.url}</span> <button className="hide-button" onClick={toggleVisibility}>hide</button></div> : null}
            {blog.likes >=0 ? <div className="likes">{blog.likes}</div> : null} 
            {<span className="countLikes"></span>}  
            {<button className="like-button" onClick={toggleLike}>like</button>}

            {blog.author ? <div className="author"><span className="author">{blog.author}</span></div> : null}
            {blog.user.username === username ? <button className="cancel-button" onClick={handleRemove}>Remove</button> : null}
          </div>
      </div>

    </>


  )

}

export default Blog