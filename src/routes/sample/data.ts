// import { RouteLoaderFunction, LoaderFunction, LoaderFunctionArgs } from "react-router-dom"

import { QueryClient } from "@tanstack/react-query"
import { LoaderFunctionArgs } from "react-router-dom"
const apiBaseUrl = import.meta.env.VITE_apiBaseUrl


export interface Link {
  link: string,
  link_level?: string,
  source?: string,
  type?: string
}

interface Cruise {
  id: number,
  cruise: string,
  links?: Array<Link>
}

interface Facility {
  id: number,
  facility: string,
  facility_code: string,
  other_link?: string
}

export interface Interval {
  id: number,
  facility: Facility,
  platform: string,
  cruise: string,
  sample?: string,
  device?: string,
  interval?: number,
  depth_top?: number,
  depth_bot?: number,
  lith1?: string,
  lith2?: string,
  text1?: string,
  text2?: string,
  comp1?: string,
  comp2?: string,
  comp3?: string,
  comp4?: string,
  comp5?: string,
  comp6?: string,
  description?: string,
  ages?: Array<string>,
  absolute_age_top?: string,
  absolute_age_bot?: string,
  weight?: number,
  rock_lith?: string,
  rock_min?: string,
  weath_meta?: string,
  remark?: string,
  munsell_code?: string,
  exhaust_code?: string,
  photo_link?: string,
  lake?: string,
  int_comments?: string,
  igsn?: string,
  imlgs?: string
}

// corresponds to response from endpoint api/samples/detail/<imlgs id> but contains additional fields
export interface Sample {
  cruise: Cruise,
  facility: Facility,
  intervals: Array<Interval>,
  platform: string,
  device: string,
  igsn?: string,
  imlgs: string,
  leg?: string,
  begin_date?: string,
  lat: number,
  lon: number,
  water_depth?: string,
  cored_length?: number,
  sample?: string,
  storage_meth?: string,
  lake?: string,
  province?: string,
  end_date?: string,
  end_lat?: number,
  end_lon?: number,
  end_water_depth?: string,
  // cored_length_mm?: number,
  cored_diam?: number,
  // cored_diam_mm?: number,
  pi?: string,
  other_link?: string,
  sample_comments?: string,
  show_sampl?: string,
  publish?: string,
  last_update?: string,
  ship_code?: string,
  latlon_orig?: string,
  links?: Array<Link>
}


export async function getSampleById( id: string ): Promise<Sample> {
  console.log('inside getSampleById')
  const response = await fetch(`${apiBaseUrl}/samples/detail/${id}`)
  if (response.status !== 200) { throw new Error(response.status.toString()) }
  return response.json()
}


export const sampleDetailQuery = (id:string) => ({
  queryKey: ['samples', 'detail', id],
  queryFn: async () => getSampleById(id)
})


export const loader = 
  (queryClient:QueryClient) =>
    async (params:LoaderFunctionArgs) => {
    console.log('inside loader function...')
    const { id } = params.params

    if (! id) {
      throw new Error("IMLGS Id argument required")
    }
    const query = sampleDetailQuery(id)

    return (
      (await queryClient.ensureQueryData(query))
    )
  }


