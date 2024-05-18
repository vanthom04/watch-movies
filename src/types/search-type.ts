import { BreadCrumb, Category, Modified, Params, SEOOnPage } from './types'

export interface SearchApi {
  status: string
  msg: string
  data: DataSearchMovie
}

export interface DataSearchMovie {
  seoOnPage: SEOOnPage
  breadCrumb: BreadCrumb[]
  titlePage: string
  items: SearchItem[]
  params: Params
  type_list: string
  APP_DOMAIN_FRONTEND: string
  APP_DOMAIN_CDN_IMAGE: string
}

export interface SearchItem {
  modified: Modified
  _id: string
  name: string
  slug: string
  origin_name: string
  type: string
  poster_url: string
  thumb_url: string
  sub_docquyen: boolean
  chieurap: boolean
  time: string
  episode_current: string
  quality: string
  lang: string
  year: number
  category: Category[]
  country: Category[]
}
