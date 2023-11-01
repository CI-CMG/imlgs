// import { RouteLoaderFunction, LoaderFunction, LoaderFunctionArgs } from "react-router-dom"

import { QueryClient } from "@tanstack/react-query"
import { LoaderFunctionArgs } from "react-router-dom"
import { searchParamsToFilters } from "../../utilities"
import { getRepositoryNameByCode as getRepositoryByCode, RepositoryNameSchema } from "../repositories/data"
import { z } from "zod"
const apiBaseUrl = import.meta.env.VITE_apiBaseUrl

const ITEMS_PER_PAGE = 250

const SampleSchema = z.object({
  imlgs: z.string(),
  facility_code: z.string(),
  platform: z.string(),
  cruise: z.string(),
  sample: z.string(),
  device: z.string(),
  begin_date: z.string(),
  lat: z.number(),
  lon: z.number(),
  water_depth: z.number(),
  storage_meth: z.string(),
  igsn: z.string().optional(),
  leg: z.string().optional(),
  cored_length: z.number().optional(),
  facility: z.optional(RepositoryNameSchema)
  // facility: RepositoryNameSchema
});


// API endpoint ${apiBaseUrl}/repositories/name
const ResponseSchema = z.object({
  items: z.array(SampleSchema),
  page: z.number(),
  total_pages: z.number(),
  total_items: z.number(), 
  items_per_page: z.number()
})

// extract the inferred type
export type Sample = z.infer<typeof SampleSchema>
export type SampleResults = z.infer<typeof ResponseSchema>


export async function getSampleResults(filters: URLSearchParams): Promise<SampleResults> {
  const myFilters = new URLSearchParams(filters)
  myFilters.set('items_per_page', ITEMS_PER_PAGE.toString())
  // console.log('inside getSampleResults. filters = ', myFilters.toString())
  const response = await fetch(`${apiBaseUrl}/samples/summary?${myFilters.toString()}`)
  if (! response.ok) {
    throw new Error(response.statusText)
  }
  const payload = await response.json() as SampleResults
  return payload as SampleResults
}


export async function getSamples(filters: URLSearchParams): Promise<Sample[]> {
  const sampleResults = await getSampleResults(filters)
  return sampleResults.items as Sample[]
}


export const samplesQuery = (filters: URLSearchParams) => ({
  queryKey: ['samples', 'summary', filters.toString()],
  // queryFn: async () => getSamples(filters)
  queryFn: async () => getSampleResults(filters)
})


export const loader = 
  (queryClient:QueryClient) =>
    async (params:LoaderFunctionArgs) => {
      // const filters = new URLSearchParams(params.request)
      // const url = new URL(window.location.href)
      const url = new URL(params.request.url)
      const filters = searchParamsToFilters(url.searchParams)
      // const { filters } = params.params
      const query = samplesQuery(filters)

      return (
        (await queryClient.ensureQueryData(query))
      )
  }
