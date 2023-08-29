// import { RouteLoaderFunction, LoaderFunction, LoaderFunctionArgs } from "react-router-dom"

import { QueryClient } from "@tanstack/react-query"
import { LoaderFunctionArgs } from "react-router-dom"
const apiBaseUrl = import.meta.env.VITE_apiBaseUrl


interface CruiseName {
  id: number,
  cruise: string,
  year?: number,
  legs?: Array<string>
}


export interface CruiseDetail extends CruiseName {
  facility_codes?: Array<string>,
  platforms?: Array<string>,
  links?: Array<CruiseLink>
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
  if (response.status === 200) {
    return response.json()
  } else {
    throw new Error(`${response.status}`)
  }
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