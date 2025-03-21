import axios from 'axios'

const api = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
  timeout: 15000,
})


const localApi = axios.create({
  baseURL: 'http://localhost:3004',
  timeout: 15000,
})

export { api, localApi }
