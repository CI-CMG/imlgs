/* one or more cruises identified by a single cruiseId */
import { useParams, Link, NavLink } from "react-router-dom";
import { useQuery } from 'react-query'
import { fetchCruiseById } from '../geosamples-api'
import { CruiseLink } from "../imlgs-types";
import "./cruise-detail.css"

// WARNING: mutates provided list
function addUniqueKey(list: CruiseLink[]) {
  if (!list) { return }
  let objectid = 0
  list.map(item => {
      objectid++ 
      item['objectid'] = objectid
  })
}


export default function CruiseDetail() {
  const baseClass = 'CruiseDetail'
  const {cruiseId} = useParams();
  console.log('redrawing CruiseDetail with ', cruiseId)

  // TODO return multiple cruises where same cruiseId shared by multiple platforms
  const { data, error, status } = useQuery(["cruiseDetail", {cruiseId}], fetchCruiseById, {
      // don't retry for 404 errors, try for up to 3 times for anything else
      retry: (failureCount:number, error:unknown) => {
          // TODO this doesn't seem to be working correctly
          if (error.statusCode === 404 || failureCount > 3) {
            return false
          } else {
            return true
          }
      }
    }
  );

  const cruise = Array.isArray(data) ? data[0] : data
  if (cruise && cruise.links) { addUniqueKey(cruise.links)}
  console.log(cruise)


  return (
    <div className={baseClass}>
      {/* {(!cruise) ? <h4>no data</h4>: ''} */}
      {cruise ?
        <>
        <h2 className={`${baseClass}--title`} style={{paddingLeft: "50px", paddingBottom: "50px"}}>Cruise: {cruise.cruise}</h2>
        <div className={`${baseClass}--info`}>
          <ul>
            {/* TODO handle case of multiple facilities */}
              <li>Id: {cruise.id}</li>
              <li>Repository: <Link to={{pathname:`/repositories/${cruise.facility_codes[0]}`}}>{cruise.facility_codes[0]}</Link></li>
              <li>Ship/Platform: {cruise.platforms.join(', ')}</li>
              <li>Year: {cruise.year}</li>
              {(cruise.legs) ? <li>Leg(s): {cruise.legs.join(', ')}</li>: ''}
          </ul>
          <ul>
              {cruise.links.map(item => (
                  <li style={{listStyle: "none"}} key={item.objectid}><a href={item.link} target="_blank" rel="noopener">{item.type}</a></li>
              ))}
          </ul>
          <hr style={{width:"100%"}} />
          Show samples from this cruise on the &nbsp;
          <Link to={{pathname:`/samples?cruise=${cruise.cruise}`}}>map</Link>
          &nbsp; or in a &nbsp; 
          <Link to={{pathname:`/samples/table?cruise=${cruise.cruise}`}}>table</Link>
        </div>
        </>
      : ''
      }
    </div>
  );
}