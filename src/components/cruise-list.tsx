import { Link } from "react-router-dom"
import { CruiseName, getCruises, getFirstPageOfCruises } from '../routes/cruises/data'
import { useQuery } from "@tanstack/react-query"
// import { fetchCruiseNames } from "../queries"

interface Props {
  filters: URLSearchParams
} 

export default function CruiseList({filters}: Props) {
  const queryResult = useQuery(['cruises', filters.toString()], () => getFirstPageOfCruises(filters))
  const cruises = queryResult?.data
  return (
    <>  
    { cruises ?
      cruises.map(cruise => (
        <Link
          style={{ display: "block", margin: "1rem 0", textDecoration: "none" }}
          to={`/cruises/${cruise.id}?${filters.toString()}`}
          key={cruise.id}
          title={`details for cruise ${cruise.id}`} 
          aria-label={`details for cruise ${cruise.id}`}
        >
          {cruise.cruise}
        </Link>
      ))
      : 'Loading...'
    }
  </>
  )
}