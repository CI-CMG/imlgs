// import { RouteLoaderFunction, LoaderFunction, LoaderFunctionArgs } from "react-router-dom"

import { QueryClient } from "@tanstack/react-query"
import { LoaderFunctionArgs } from "react-router-dom"
import { RepositoryName, getRepositoryNameByCode } from "../repositories/data"
import { searchParamsToFilters } from "../../utilities"
const apiBaseUrl = import.meta.env.VITE_apiBaseUrl


export interface CruiseName {
  id: number,
  cruise: string,
  year?: number,
  legs?: Array<string>
}

interface Platform {
  id: number,
  platform: string
}

export interface CruiseDetail extends CruiseName {
  facility_codes: Array<string>,
  platforms: Array<Platform>,
  links?: Array<CruiseLink>,
  facilities: Array<RepositoryName>
}


export interface CruiseLink {
  link: string,
  link_level: string,
  source: string,
  type: string
}

export interface CruiseCount {
  count: number
}

// returns a list of all cruises matching filters, regardless of total number
export async function getCruises(defaultFilters: URLSearchParams): Promise<CruiseName[]> {
  const filters = new URLSearchParams(defaultFilters)
  filters.set('items_per_page', '1000')

  const results = [];
  let totalPages = 1
  let currentPage = 0;

  while (totalPages  > currentPage) {
    currentPage = currentPage + 1
    filters.set('page', currentPage.toString())
    const response = await fetch(`${apiBaseUrl}/cruises/name?${filters.toString()}`)
    if (! response.ok) {
      throw new Error(response.statusText)
    }
    const payload = await response.json()
    if (currentPage === 1) {
      totalPages = payload.total_pages
    }
    results.push(...payload.items);
  }
  return results as CruiseName[]
}


// get cruises matching filters but limited to one page of results
export async function getFirstPageOfCruises(defaultFilters: URLSearchParams):Promise<CruiseName[]> {
  const filters = new URLSearchParams(defaultFilters)
  filters.set('items_per_page', '500')
  const response = await fetch(`${apiBaseUrl}/cruises/name?${filters.toString()}`)
  if (! response.ok) {
    throw new Error(response.statusText)
  }
  const payload = await response.json()
  return payload.items
}


export async function getCruisesCount(filters:URLSearchParams): Promise<number> {
  console.log('inside getCruisesCount with ', filters.toString())
  const response = await fetch(`${apiBaseUrl}/cruises/count?${filters.toString()}`)
  if (! response.ok) {
    throw new Error(response.statusText)
  }
  const payload = await response.json()
  return payload.count
}

export async function getCruise( id: number ): Promise<CruiseDetail> {
  const response = await fetch(`${apiBaseUrl}/cruises/detail/${id}`)
  if (response.status !== 200) {
    throw new Error(`${response.status}`)
  }
  const payload = await response.json() as CruiseDetail
  return payload
}

  
export const cruiseDetailQuery = (cruiseId:number) => ({
  queryKey: ['cruises', 'detail', cruiseId],
  queryFn: async () => getCruise(cruiseId)
})

export const cruiseCountQuery = (filters:URLSearchParams) => ({
  queryKey: ['cruises', 'count', filters.toString()],
  queryFn: async () => getCruisesCount(filters)
})

export const loader = 
  (queryClient:QueryClient) =>
    async (params:LoaderFunctionArgs) => {
    const { cruiseId } = params.params

    if (! cruiseId) {
      throw new Error("cruiseId argument required")
    }
    const id = parseInt(cruiseId)
    if (isNaN(id)) {
      throw new Error("cruiseId must be a number")
    }
    const query = cruiseDetailQuery(id)

    return (
      (await queryClient.ensureQueryData(query))
    )
  }


  // export const cruisesLoader = 
  //   (queryClient:QueryClient) =>
  //     async () => {
  //       const url = new URL(window.location.href)
  //       const filters = searchParamsToFilters(url.searchParams)
  //       const query = cruiseCountQuery(filters)
  //       return ((await queryClient.ensureQueryData(query)))
  //     }
  
  export async function cruisesLoader() {
    const url = new URL(window.location.href)
    const filters = searchParamsToFilters(url.searchParams)
    const cruisesCount = await getCruisesCount(filters)
    return cruisesCount
  }