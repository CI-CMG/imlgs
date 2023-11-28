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


export async function getCruises(): Promise<CruiseName[]> {
  const url = new URL(window.location.href)
  const filters = searchParamsToFilters(url.searchParams)
  filters.set('items_per_page', '1000')
  // console.log('inside getCruises: all filters: ', filters.toString())

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

export async function getCruisesCount(): Promise<number> {
  const url = new URL(window.location.href)
  const filters = searchParamsToFilters(url.searchParams)

  const response = await fetch(`${apiBaseUrl}/cruises/count?${filters.toString()}`)
  if (! response.ok) {
    throw new Error(response.statusText)
  }
  const payload = await response.json()
  console.log({payload})
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


  export async function cruisesLoader() {
    const cruisesCount = await getCruisesCount();
    return cruisesCount
  }