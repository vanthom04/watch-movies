export interface MovieApi {
  status: boolean
  msg: string
  movie: Movie
  episodes: Episode[]
}

export interface Episode {
  server_name: string
  server_data: ServerData[]
}

export interface ServerData {
  name: string
  slug: string
  filename: string
  link_embed: string
  link_m3u8: string
}

export interface Movie {
  tmdb: Tmdb
  imdb: Imdb
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
  time: Date | string
}

export interface Imdb {
  id: null
}

export interface Tmdb {
  type: null
  id: null
  season: null
  vote_average: number
  vote_count: number
}

//
export interface SearchApi {
  status: string
  msg: string
  data: Data
}

export interface Data {
  seoOnPage: SEOOnPage
  breadCrumb: BreadCrumb[]
  titlePage: string
  items: SearchItemType[]
  params: Params
  type_list: string
  APP_DOMAIN_FRONTEND: string
  APP_DOMAIN_CDN_IMAGE: string
}

export interface BreadCrumb {
  name: string
  isCurrent: boolean
  position: number
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

export interface Category {
  id: string
  name: string
  slug: string
}

export interface Modified {
  time: Date
}

export interface Params {
  type_slug: string
  keyword: string
  filterCategory: null[]
  filterCountry: null[]
  filterYear: number
  filterType: null
  sortField: string
  sortType: string
  pagination: Pagination
}

export interface Pagination {
  totalItems: number
  totalItemsPerPage: number
  currentPage: number
  totalPages: number
}

export interface SEOOnPage {
  og_type: string
  titleHead: string
  descriptionHead: string
  og_image: string[]
  og_url: string
}
