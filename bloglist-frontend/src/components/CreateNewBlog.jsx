

const CreateNewBlog=({
    handleNewBlog,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,

    title,
    author,
    url,
 })=>(


  <form onSubmit={handleNewBlog}>
    <h1>Create new Blog</h1>
    <div>
      Tittle:
      <input
      type='text'
      value={title}
      name='tittle'
      onChange={handleTitleChange}
      />
    </div>
    <div>
      Author:
      <input
      type='text'
      value={author}
      name='author'
      onChange={handleAuthorChange}
      />
    </div>
    <div>
      Url:
      <input
      type='text'
      value={url}
      name='url'
      onChange={handleUrlChange}
      />
    </div>
    <button type='submit'>create</button>


  </form>

)

export default CreateNewBlog