import { Link } from "react-router-dom"
import { CruiseName } from '../routes/cruises/data'

interface CruiseListProps {
  cruises: Array<CruiseName>
} 

export default function CruiseList(props: CruiseListProps) {
  const cruises = props.cruises
  return (
    <>  
    {
      cruises.map(cruise => (
        <Link
          style={{ display: "block", margin: "1rem 0", color: "#282c34", textDecoration: "none" }}
          to={`/cruises/${cruise.id}`}
          key={cruise.id}
        >
          {cruise.cruise}
        </Link>
      ))
    }
  </>
  )
}