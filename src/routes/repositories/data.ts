// import { RouteLoaderFunction, LoaderFunction, LoaderFunctionArgs } from "react-router-dom"

import { QueryClient } from "@tanstack/react-query"
import { LoaderFunctionArgs } from "react-router-dom"
import { z } from "zod"

const apiBaseUrl = import.meta.env.VITE_apiBaseUrl

const RepositoryNameSchema = z.object({
  id: z.number(),
  facility: z.string(),
  facility_code: z.string()
});

//TODO verify optional fields
const RepositoryDetailSchema = RepositoryNameSchema.extend({
  sample_count: z.number(),
  facility_comment: z.string().optional(),
  inst_code: z.string().optional(),
  addr1: z.string().optional(),
  addr2: z.string().optional(),
  addr3: z.string().optional(),
  addr4: z.string().optional(),
  contact1: z.string().optional(),
  contact2: z.string().optional(),
  contact3: z.string().optional(),
  email_link: z.string().optional(),
  url_link: z.string().optional(),
  ftp_link: z.string().optional(),
  other_link: z.string().optional()
})

// API endpoint ${apiBaseUrl}/repositories/name
const RepositoryResults = z.object({
  items: z.array(RepositoryNameSchema),
  page: z.number(),
  total_pages: z.number(),
  total_items: z.number(), 
  items_per_page: z.number()
})

// extract the inferred type
export type RepositoryName = z.infer<typeof RepositoryNameSchema>
export type RepositoryDetail = z.infer<typeof RepositoryDetailSchema>


export async function getRepositories(): Promise<RepositoryName[]> {
  const response = await fetch(`${apiBaseUrl}/repositories/name`)
  if (! response.ok) {
    throw new Error(response.statusText)
  }
  const payload = await response.json()
  console.log({payload})
  RepositoryResults.parse(payload)
  return payload.items as RepositoryName[]
}

export async function getRepository( id: number ): Promise<RepositoryDetail> {
  const response = await fetch(`${apiBaseUrl}/repositories/detail/${id}`)
  if (! response.ok) {
    throw new Error(response.statusText)
  }
  const payload = await response.json()
  console.log({payload})
  // runtime validation of API response
  RepositoryDetailSchema.parse(payload)
  return payload as RepositoryDetail
}

 
export async function getRepositoryNameByCode( code: string ): Promise<RepositoryName> {
  const response = await fetch(`${apiBaseUrl}/repositories/name?repository=${code}`)
  if (response.status !== 200) {
    throw new Error(response.status.toString())
  }
  const payload = await response.json()
  // should only be one repository matching code
  if (payload.items.length !== 1) {
    throw new Error('invalid facility code')
  }
  return payload.items[0]
}


export const repositoryDetailQuery = (repositoryId:number) => ({
  queryKey: ['repositories', 'detail', repositoryId],
  queryFn: async () => getRepository(repositoryId)
})


export const loader = 
  (queryClient:QueryClient) =>
    async (params:LoaderFunctionArgs) => {
    const { repositoryId } = params.params

    if (! repositoryId) {
      throw new Error("repositoryId argument required")
    }
    const id = parseInt(repositoryId)
    if (isNaN(id)) {
      throw new Error("repositoryId must be a number")
    }
    const query = repositoryDetailQuery(id)

    return (
      (await queryClient.ensureQueryData(query))
    )
  }


  export async function repositoriesLoader() {
    const repositories = await getRepositories();
    return { repositories }
  }