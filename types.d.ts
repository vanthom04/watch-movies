export interface Category {
  id: string
  name: string
  slug: string
}

export interface Created {
  time: Date
}

export interface Modified {
  time: Date
}

export interface Pagination {
  totalItems: number
  totalItemsPerPage: number
  currentPage: number
  totalPages: number
}

export interface BreadCrumb {
  name: string
  isCurrent: boolean
  position: number
}

export interface Params {
  type_slug: string
  keyword: string
  filterCategory: string[]
  filterCountry: string[]
  filterYear: string
  filterType: string
  sortField: string
  sortType: string
  pagination: Pagination
}

export interface SEOOnPage {
  og_type: string
  titleHead: string
  descriptionHead: string
  og_image: string[]
  og_url: string
}

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

export interface SearchItemType {
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

// movie types
export interface MovieApi {
  status: boolean
  msg: string
  movie: Movie
  episodes: ServerData[]
}

export interface ServerData {
  server_name: string
  server_data: Episode[]
}

export interface Episode {
  name: string
  slug: string
  filename: string
  link_embed: string
  link_m3u8: string
}

export interface Movie {
  created: Created
  modified: Created
  _id: string
  name: string
  slug: string
  origin_name: string
  content: string
  type: string
  status: string
  poster_url: string
  thumb_url: string
  is_copyright: boolean
  sub_docquyen: boolean
  chieurap: boolean
  trailer_url: string
  time: string
  episode_current: string
  episode_total: string
  quality: string
  lang: string
  notify: string
  showtimes: string
  year: number
  view: number
  actor: string[]
  director: string[]
  category: Category[]
  country: Category[]
}

export interface Category {
  id: string
  name: string
  slug: string
}

export interface Created {
  time: Date
}
