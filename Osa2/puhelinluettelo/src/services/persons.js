import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return (
    axios
    .get('http://localhost:3001/persons')
    .then(response => response.data)
  )
}

const create = newObject => {
    return (
        axios
    .post('http://localhost:3001/persons', newObject)
    .then(response => response.data)
    )
    
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { 
  getAll, create, update
}