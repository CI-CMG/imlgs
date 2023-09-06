import { Link, Outlet, useLoaderData } from "react-router-dom"
import { cruisesLoader } from "./data"
import CruiseList from "../../components/cruise-list"
import { searchParamsToFilters } from "../../utilities"
import './cruises.css'

const baseClass = 'Cruises'

export default function Cruises() {
  const { cruises } = useLoaderData() as Awaited<ReturnType<typeof cruisesLoader>>
  console.log(`${cruises.length} cruises loaded`)

  

  return (
    <div className={`${baseClass}--wrapper`}>
      <div className={`${baseClass}--sidebar`}>
        {cruises ? <CruiseList cruises={cruises}/> : '' }
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