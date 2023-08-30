// import { RouteLoaderFunction, LoaderFunction, LoaderFunctionArgs } from "react-router-dom"

import { QueryClient } from "@tanstack/react-query"
import { LoaderFunctionArgs } from "react-router-dom"
const apiBaseUrl = import.meta.env.VITE_apiBaseUrl


interface RepositoryName {
  id: string,
  facility: string,
  facility_code: string
}

interface RepositorySummary extends RepositoryName {
  sample_count: number,
  facility_comment: string
}

export interface RepositoryDetail extends RepositorySummary {
  inst_code?: string,
  addr1?: string,
  addr2?: string,
  addr3?: string,
  addr4?: string,
  contact1: string,
  contact2: string,
  contact3: string,
  email_link?: string,
  url_link?: string,
  ftp_link: string,
  other_link?: string
}


export async function getRepositories(): Promise<RepositoryName[]> {
  const response = await fetch(`${apiBaseUrl}/repositories/name`)
  if (! response.ok) {
    throw new Error(response.statusText)
  }
  const payload = await response.json()
  return payload.items as RepositoryName[]
}

export async function getRepository( id: number ): Promise<RepositoryDetail> {
  const response = await fetch(`${apiBaseUrl}/repositories/detail/${id}`)
  if (response.status === 200) {
    return response.json()
  } else {
    throw new Error(`${response.status}`)
  }
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