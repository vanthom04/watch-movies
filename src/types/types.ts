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
