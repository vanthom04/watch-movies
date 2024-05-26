/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { API_ROOT } from './constants'

class Api {
  private axiosInstance: AxiosInstance

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000
    })

    this.axiosInstance.interceptors.response.use(this.handleSuccess, this.handleError)
  }

  private handleSuccess(response: AxiosResponse) {
    return response
  }

  private handleError(error: any) {
    return Promise.reject(error)
  }

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.get<T>(url, config).then((response) => response.data)
  }

  public post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.post<T>(url, data, config).then((response) => response.data)
  }

  public put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.put<T>(url, data, config).then((response) => response.data)
  }

  public patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.patch<T>(url, data, config).then((response) => response.data)
  }

  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.delete<T>(url, config).then((response) => response.data)
  }
}

export const api = new Api(API_ROOT)
