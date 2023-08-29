// import { RouteLoaderFunction, LoaderFunction, LoaderFunctionArgs } from "react-router-dom"

import { QueryClient } from "@tanstack/react-query"
import { LoaderFunctionArgs } from "react-router-dom"
import {RepositoryNameResponse } from '../../imlgs-types'
const apiBaseUrl = import.meta.env.VITE_apiBaseUrl

const doiLinks = new Map([
[4, "https://dx.doi.org/doi:10.7289/V5N014HR"],
[16, "https://dx.doi.org/doi:10.7289/V5NZ85N8"],
[31, "https://dx.doi.org/doi:10.7289/V5RR1W7S"],
[10, "https://dx.doi.org/doi:10.7289/V5VM498W"],
[14, "https://dx.doi.org/doi:10.7289/V5BP00RZ"],
[15, "https://dx.doi.org/10.7289/V5RF5S18"],
[27, "https://dx.doi.org/doi:10.7289/V5H70CS1"],
// [29, undefined],
// [2, undefined],
[28, "https://dx.doi.org/doi:10.7289/V5J67DXV"],
[6,  "https://dx.doi.org/doi:10.7289/V5GF0RG9"],
// [12, undefined],
[7,  "https://dx.doi.org/doi:10.7289/V5G73BP3"],
[3,  "https://dx.doi.org/doi:10.7289/V5J38QHJ"],
[30, "http://dx.doi.org/doi:10.7289/V5M61H7G"],
[5,  "https://dx.doi.org/doi:10.7289/V57M05XN"],
[1,  "https://dx.doi.org/doi:10.7289/V57M05XN"],
// [11, undefined],
[19, "https://dx.doi.org/doi:10.7289/V5TH8JPB"],
[26, "https://dx.doi.org/doi:10.7289/V50C4SRS"],
[20, "https://dx.doi.org/doi:10.7289/V5CF9N3M"],
[21, "https://dx.doi.org/doi:10.7289/V57S7KRR"],
[8,  "https://dx.doi.org/doi:10.7289/V50P0X05"],
[24, "https://dx.doi.org/doi:10.7289/V51834G7"],
[23, "https://dx.doi.org/doi:10.7289/V5JQ0Z0W"],
[18, "https://dx.doi.org/doi:10.7289/V55T3HGJ"],
[13, "https://dx.doi.org/doi:10.7289/V5222RR4"],
[9,  "https://dx.doi.org/doi:10.7289/V58P5XH8"],
[17, "https://dx.doi.org/doi:10.7289/V5513W54"],
[22, "https://dx.doi.org/doi:10.7289/V5X92887"],
[25, "https://dx.doi.org/doi:10.7289/V5WH2N0Z"]
])


/*
// TODO this is not working. Something about the timing 
// one-time only - setup mapping between repository Id and DOI (other_link attribute)
export const repositoryDOIs = new Map<number, string>()
fetch(`${apiBaseUrl}/repositories/name`)
  .then(response => response.json())
  .then((response:RepositoryNameResponse) => response.items.map(it => it.id))
  .then(ids => {
    ids.forEach(id => {
      fetch(`${apiBaseUrl}/repositories/detail/${id}`)
      .then(response => response.json())
      .then(response => {
        repositoryDOIs.set(id, response.other_link)
        console.log(repositoryDOIs)
      
      })
    })
  })
*/

  export function lookupRepositoryDOI(id:number) {
    return doiLinks.get(id)
  }

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