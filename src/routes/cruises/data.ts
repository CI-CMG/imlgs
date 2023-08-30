// import { RouteLoaderFunction, LoaderFunction, LoaderFunctionArgs } from "react-router-dom"

import { QueryClient } from "@tanstack/react-query"
import { LoaderFunctionArgs } from "react-router-dom"
import { RepositoryName, getRepositoryNameByCode } from "../repositories/data"
const apiBaseUrl = import.meta.env.VITE_apiBaseUrl


interface CruiseName {
  id: number,
  cruise: string,
  year?: number,
  legs?: Array<string>
}


export interface CruiseDetail extends CruiseName {
  facility_codes: Array<string>,
  platforms?: Array<string>,
  links?: Array<CruiseLink>,
  facilities?: Array<RepositoryName>
}


export interface CruiseLink {
  link: string,
  link_level: string,
  source: string,
  type: string
}


export async function getCruises(): Promise<CruiseName[]> {
  const response = await fetch(`${apiBaseUrl}/cruises/name`)
  if (! response.ok) {
    throw new Error(response.statusText)
  }
  const payload = await response.json()
  return payload.items as CruiseName[]
}

export async function getCruise( id: number ): Promise<CruiseDetail> {
  const response = await fetch(`${apiBaseUrl}/cruises/detail/${id}`)
  if (response.status !== 200) {
    throw new Error(`${response.status}`)
  }
  const payload = await response.json() as CruiseDetail
  // augment CruiseDetail with more complete Repository information
  const facilities = new Array<RepositoryName>
  payload.facility_codes?.forEach(async code => {
    const repository: RepositoryName = await getRepositoryNameByCode(code)
    facilities.push(repository)
  })
  payload.facilities = facilities
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
    const cruises = await getCruises();
    return { cruises }
  }