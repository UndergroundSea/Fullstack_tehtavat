import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return (
    axios
      .get('/api/persons')
      .then(response => response.data)
  )
}

const create = newObject => {
  return (
    axios
      .post('/api/persons', newObject)
      .then(response => response.data)
  )

}

/*{
const update = newObject => {
  return (
    axios
      .put(`/api/persons/'${id}`, newObject)
      .then(response => response.data)
  )
}
}*/

const remove = ({ id }) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default {
  getAll, create, remove
}