export interface MovieApi {
  status: boolean
  msg: string
  movie: Movie
  episodes: Episode[]
}

export interface Episode {
  server_name: string
  server_data: ServerDatum[]
}

export interface ServerDatum {
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
