import { Outlet, NavLink, Link } from "react-router-dom";
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from 'react-query'
import { useParams } from "react-router-dom";
import { fetchCruises, fetchCruiseNames } from '../geosamples-api'
import { extractDefaultFiltersFromUrl } from '../geosamples-utils'
import "./cruises.css";


// WARNING: mutates provided list
function addUniqueKey(cruiseList) {
  if (!cruiseList) { return }
  let objectid = 0
  cruiseList.map(item => {
      objectid++ 
      item['objectid'] = objectid
  })
}


export default function Cruises() {
  let params = useParams();
  console.log('redrawing Cruises with ', params)
  const baseClass = 'Cruises'
  
  const url = new URL(location.href)
  // key/value pairs of any URL search parameters used to filter cruises
  const filterDefaults = extractDefaultFiltersFromUrl(url)

  const queryClient = useQueryClient()
  const { data:cruiseList, error, status} = useQuery(["cruises", filterDefaults], fetchCruiseNames, {
    staleTime: Infinity
  });
  console.log(cruiseList)
  
  // augment cruiseList with unique value to use as key
  // addUniqueKey(cruiseList)

    return (      
      <div className={`${baseClass}--wrapper`}>
        <nav className={`${baseClass}--sidebar`}>
        {(!cruiseList) ? <h4>no data</h4>: ''}
        {cruiseList ?
          cruiseList.map((cruise) => (
            <NavLink
              className={`${baseClass}--navlink`}
              style={({ isActive }) => {
                return {
                  display: "block",
                  margin: "1rem 0",
                  color: isActive ? "red" : "",
                };
              }}
              to={`/cruises/${cruise.id}`}
              key={cruise.id}
            >
              {cruise.cruise}
            </NavLink>
          ))
          : ''
        }
        {/* {cruiseList ? 
            <table className={`${baseClass}--datatable`}>
            <thead><tr><th>Cruise</th><th>Leg</th><th>Ship/<br/>Platform</th><th>Repository</th></tr></thead>
            <tbody>{
                cruiseList.map(item => (
                <tr key={item.objectid}>
                <td><NavLink to={{pathname:`/cruises/${item.cruise}`}}>{item.cruise}</NavLink></td>
                <td>{item.leg}</td>
                <td>{item.platform}</td>
                <td><NavLink to={{pathname:`/repositories/${item.facility_code}`}}>{item.facility_code}</NavLink></td>
                </tr>
            )) 
            }
            </tbody>
            </table>
            : ''
          } */}
        </nav>
        <Outlet/>
      </div>
    
    );
  }
