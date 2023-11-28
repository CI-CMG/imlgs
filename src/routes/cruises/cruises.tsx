import { Link, Outlet, useLoaderData } from "react-router-dom"
import { cruisesLoader, getCruises } from "./data"
import { fetchCruiseNames } from "../../queries"
import CruiseList from "../../components/cruise-list"
import { searchParamsToFilters } from "../../utilities"
import { useQuery } from "@tanstack/react-query"
import InfiniteCruiseList from "../../components/infinite-cruise-list"
import './cruises.css'

const baseClass = 'Cruises'

export default function Cruises() {
  const cruisesCount = useLoaderData() as Awaited<number>
  // console.log(`${cruisesCount} cruises loaded`)

  // const url = new URL(window.location.href)
  // const filters = searchParamsToFilters(url.searchParams)
  // console.log('all filters: ', filters.toString())
  // const results = useQuery({ 
  //   queryKey: ['cruises', filters.toString()],
  //   queryFn: () => fetchCruiseNames(filters) 
  // })
  // console.log({results})
  return (
    <div className={`${baseClass}--wrapper`}>
      <div className={`${baseClass}--sidebar`}>
        { cruisesCount ?
          <span style={{fontWeight: 'bold'}}>{cruisesCount} cruises matching criteria</span>
          : ''
        }
        {/* <CruiseList cruises={cruises}/> */}
        <InfiniteCruiseList />
      </div>
      <div className={`${baseClass}--main`}>
        <Outlet/>
      </div>
    </div>
  )
  
}

export function Index() {
  return (
    <p style={{'paddingLeft': '1rem'}}>
      Please select a Cruise to get its details
    </p>
  );
}