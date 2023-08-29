import { Link, Outlet, useLoaderData } from "react-router-dom"
import { cruisesLoader } from "./data";

import './cruises.css'

const baseClass = 'Cruises'

export default function Cruises() {
  const { cruises } = useLoaderData() as Awaited<ReturnType<typeof cruisesLoader>>
  console.log(`${cruises.length} cruises loaded`)

  return (
    <div className={`${baseClass}--wrapper`}>
      <div className={`${baseClass}--sidebar`}>
        {cruises ? 
            cruises.map((cruise) => (
            <Link
              style={{ display: "block", margin: "1rem 0", color: "#282c34", textDecoration: "none" }}
              to={`/cruises/${cruise.id}`}
              key={cruise.id}
            >
              {cruise.cruise}
            </Link>
          )): '' }
      </div>
      <div className={`${baseClass}--main`}>
        <Outlet/>
      </div>
    </div>
  )
  
}

export function Index() {
  return (
    <p>
      Please select a Cruise to get its details
    </p>
  );
}