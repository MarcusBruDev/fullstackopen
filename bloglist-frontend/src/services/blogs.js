import axios from 'axios'
const baseUrl = '/api/blogs'
const baseUrlUser = '/api/users'

let token = null

const setToken= newToken =>{
    token=`bearer ${newToken}`

}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getAllUser = () => {
  const request = axios.get(baseUrlUser)
  return request.then(response => response.data)
}

const create = async (newObject) => {
 


  const config = {
    headers: { Authorization:token},
  }


  const response = await axios.post(baseUrl, newObject, config)

  return response.data
}


const update = async (id,newObject)=>{


  const config = {
    headers: { Authorization:token},
  }

  const request = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.data
}


const deleteBlog = async (id) => {

  const config = {
    headers: { Authorization: token },
  }

  const request = await axios.delete(`${baseUrl}/${id}`, config)
  return request.data
}






export default { getAll ,create,update,deleteBlog,getAllUser,setToken}