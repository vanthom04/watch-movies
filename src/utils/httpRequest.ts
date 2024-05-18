import axios, { AxiosRequestConfig } from 'axios'
import { API_ROOT } from './constants'

const httpRequest = axios.create({
  baseURL: API_ROOT,
  timeout: 20000
})

export const get = async (path: string, options: AxiosRequestConfig = {}) => {
  const response = await httpRequest.get(path, options)
  return response.data
}

export default httpRequest
