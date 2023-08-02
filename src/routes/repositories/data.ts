// import { RouteLoaderFunction, LoaderFunction, LoaderFunctionArgs } from "react-router-dom"

import { QueryClient } from "@tanstack/react-query"
import { LoaderFunctionArgs } from "react-router-dom"

interface RepositoryName {
  id: number,
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
  const response = await fetch('https://www.ngdc.noaa.gov/geosamples-api/repositories?name_only=true')
  return response.json()
}

export async function getRepository( id: string ): Promise<RepositoryDetail> {
  console.log('inside getRepository with ', id)
  const response = await fetch(`https://www.ngdc.noaa.gov/geosamples-api/repositories/${id}`)
  if (response.status === 200) {
    return response.json()
  } else {
    throw new Error(`${response.status}`)
  }
}


/*
// export async function repositoryLoader({request, params}: {request: Request, params: RepositoryLoaderParams}) {
export async function repositoryLoader({params}:{params:RepositoryLoaderParams}) {
  // export async function repositoryLoader(params) {
  console.log('inside repositoryLoader with ', params)
  const {repositoryId} = params as RepositoryLoaderParams
  console.log(repositoryId)
  const repository = await getRepository(repositoryId)
  console.log({repository})
  if (!repository.facility) {
    throw new Error(`Repository ${repositoryId} not found`)
  }
  return { repository }
}
*/
  
export const repositoryDetailQuery = (repositoryId:string) => ({
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
    const query = repositoryDetailQuery(repositoryId)

    return (
      (await queryClient.ensureQueryData(query))
    )
  }


  export async function repositoriesLoader() {
    const repositories = await getRepositories();
    return { repositories }
  }