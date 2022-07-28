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


// WARNING: v2.x of API returns array of cruises rather than a single one
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
  // console.log(cruise)


  return (
    <div className={baseClass}>
      <h2 className={`${baseClass}--title`} style={{paddingLeft: "50px", paddingBottom: "50px"}}>Cruise: {cruiseId}</h2>
      {/* {(!cruise) ? <h4>no data</h4>: ''} */}
      {cruise ?
        <div className={`${baseClass}--info`}>
          <ul>
              <li>Repository: <Link to={{pathname:`/repositories/${cruise.facility_code}`}}>{cruise.facility_code}</Link></li>
              <li>Ship/Platform: {cruise.platform}</li>
              {(cruise.leg) ? <li>Leg: {cruise.leg}</li>: ''}
          </ul>
          <ul>
              {cruise.links.map(item => (
                  <li style={{listStyle: "none"}} key={item.objectid}><a href={item.LINK} target="_blank" rel="noopener">{item.TYPE}</a></li>
              ))}
          </ul>
          <hr style={{width:"100%"}} />
          Show samples from this cruise on the &nbsp;
          <Link to={{pathname:`/samples?cruise=${cruiseId}`}}>map</Link>
          &nbsp; or in a &nbsp; 
          <Link to={{pathname:`/samples/table?cruise=${cruiseId}`}}>table</Link>
        </div>
      : ''
      }
    </div>
  );
}