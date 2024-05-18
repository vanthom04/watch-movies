import { BreadCrumb, Category, Modified, Params, SEOOnPage } from './types'

export interface ListMovieApi {
  status: string
  msg: string
  data: DataListMovie
}

export interface DataListMovie {
  seoOnPage: SEOOnPage
  breadCrumb: BreadCrumb[]
  titlePage: string
  items: ItemListMovie[]
  params: Params
  type_list: string
  APP_DOMAIN_FRONTEND: string
  APP_DOMAIN_CDN_IMAGE: string
}

export interface ItemListMovie {
  modified: Modified
  _id: string
  name: string
  slug: string
  origin_name: string
  type: Type
  poster_url: string
  thumb_url: string
  sub_docquyen: boolean
  chieurap: boolean
  time: string
  episode_current: string
  quality: Quality
  lang: Lang
  year: number
  category: Category[]
  country: Category[]
}

export enum Lang {
  Vietsub = 'Vietsub'
}

export enum Quality {
  HD = 'HD'
}

export enum Type {
  Series = 'series'
}
