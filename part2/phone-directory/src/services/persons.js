import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseURL)
    /* const nonExisting = {
        id: 1000,
        content: 'This note is not saved to server',
        date: '2021-09-11T17:30:31.098Z',
        important: true
    } */
    //                                           .concat(nonExisting)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseURL, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseURL}/${id}`, newObject)
    return request.then(response => response.data)
}

const deleteObj = (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(() => true)
}

export default { getAll, create, update, deleteObj }