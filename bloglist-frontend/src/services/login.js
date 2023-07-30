import axios from 'axios'
const baseUrl = '/api/login'

const login = async (creds) => {
  console.log(creds)
  const res = await axios.post(baseUrl, creds)
  return res.data
}

export  { login }