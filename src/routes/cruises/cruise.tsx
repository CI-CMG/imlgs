import './cruise.css'
import { useLoaderData, useParams, Link } from "react-router-dom"
import { loader as cruiseLoader, cruiseDetailQuery, CruiseDetail } from "./data"
import { QueryClient, useQuery } from "@tanstack/react-query"
const apiBaseUrl = import.meta.env.VITE_apiBaseUrl

interface RepositoryName {
  id: number,
  facility: string,
  facility_code: string
}

interface Payload {
  items: Array<RepositoryName>
}

const repositoryLookup = new Map()

export async function loadRepositoryIds() {
  const response = await fetch(`${apiBaseUrl}/repositories/name`)
  if (! response.ok) {
    throw new Error(response.statusText)
  }
  const payload = await response.json() as Payload
  payload.items.forEach(it => {
    repositoryLookup.set(it.facility_code, it.id)
  })
}

loadRepositoryIds()


function formatFacilities(data: CruiseDetail) {
  const facilities = data.facility_codes?.map((code, idx) => {
    // work around inconsistency in API
    return <Link key={idx} to={{pathname:`/repositories/${repositoryLookup.get(code)}`}}>{code}</Link>
  });
  return facilities
}


export default function Cruise () {
  const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof cruiseLoader>>>
  const {cruiseId} = useParams()
  if (!cruiseId) {
    throw new Error("Cruise Id must be provided")
  }
  const id = parseInt(cruiseId)
    if (isNaN(id)) {
      throw new Error("cruiseId must be a number")
    }

    const { data: cruiseDetail }: {data: CruiseDetail} = useQuery({
    ...cruiseDetailQuery(id), 
    initialData})
  const baseClass = 'CruiseDetail'
  
  console.log('cruise detail: ', cruiseDetail)
  
  return (
      <div className={baseClass}>
        <h2 className={`${baseClass}--title`} style={{paddingLeft: "50px", paddingBottom: "50px"}}>Cruise: {cruiseDetail.cruise}</h2>
      {/* {(!cruise) ? <h4>no data</h4>: ''} */}
      {cruiseDetail ?
        <div className={`${baseClass}--info`}>
          <ul>
              <li>Repository: {formatFacilities(cruiseDetail)}</li>
              <li>Ship/Platform: {cruiseDetail.platforms?.join(', ')}</li>
              {(cruiseDetail.year) ? <li>Year: {cruiseDetail.year}</li>: ''}
              {(cruiseDetail.legs?.length) ? <li>Leg: {cruiseDetail.legs?.join(', ')}</li>: ''}
          </ul>
          {cruiseDetail.links ?
            <ul>
              {cruiseDetail.links.map((item, idx) => (
                  <li style={{listStyle: "none"}} key={idx}><a href={item.link} target="_blank" rel="noopener">{item.type}</a></li>
              ))}
            </ul>
            : ''
          }
          <hr style={{width:"100%"}} />
          Show samples from this cruise on the &nbsp;
          <Link to={{pathname:'/samples', search: `cruise=${cruiseDetail.cruise}`}}>map</Link>
          &nbsp; or in a &nbsp; 
          <Link to={{pathname:'/samples/table', search: `cruise=${cruiseDetail.cruise}`}}>table</Link>
        </div>
      : ''
      }
    </div>
  )
}