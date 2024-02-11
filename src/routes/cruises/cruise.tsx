import './cruise.css'
import { useLoaderData, useParams, Link } from "react-router-dom"
import { loader as cruiseLoader, cruiseDetailQuery, CruiseDetail } from "./data"
// import { RepositoryName } from '../repositories/data'
import { QueryClient, useQuery } from "@tanstack/react-query"
const apiBaseUrl = import.meta.env.VITE_apiBaseUrl


function formatFacilities(data: CruiseDetail) {
  const facilities = data.facilities?.map((facility) => {
    return <Link key={facility.id} to={{pathname:`/repositories/${facility.id}`}}>{facility.facility_code}</Link>
  })
  // TODO works only with 1 or 2 facilities
  if (facilities.length > 1) {
    facilities.splice(1,0,<span key={'0'}>, </span>)
  }
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
  
  // console.log('cruise detail: ', cruiseDetail)
  const platformNames = cruiseDetail.platforms?.map(item => item.platform )

  return (
      <div className={baseClass}>
        <h2 className={`${baseClass}--title`} style={{paddingLeft: "50px", paddingBottom: "50px"}}>Cruise: {cruiseDetail.cruise}</h2>
      {/* {(!cruise) ? <h4>no data</h4>: ''} */}
      {cruiseDetail ?
        <div className={`${baseClass}--info`}>
          <ul>
              <li>System ID: {cruiseDetail.id}</li>
              <li>Repository: {formatFacilities(cruiseDetail)}</li>
              <li>Ship/Platform: {platformNames.join(', ')}</li>
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
          <hr style={{width:"90%"}} />
          <div style={{'textAlign': 'center'}}>
          Show samples from this cruise on the &nbsp;
          <Link to={{pathname:'/samples', search: `cruise_id=${cruiseDetail.id}`}}>map</Link>
          &nbsp; or in a &nbsp; 
          <Link to={{pathname:'/samples/table', search: `cruise_id=${cruiseDetail.id}`}}>table</Link>
          </div>
        </div>
      : ''
      }
    </div>
  )
}