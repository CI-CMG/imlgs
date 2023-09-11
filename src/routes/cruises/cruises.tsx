import { Link, Outlet, useLoaderData } from "react-router-dom"
import { cruisesLoader, getCruises } from "./data"
import { fetchCruiseNames } from "../../queries"
import CruiseList from "../../components/cruise-list"
import { searchParamsToFilters } from "../../utilities"
import { useQuery } from "@tanstack/react-query"

import './cruises.css'

const baseClass = 'Cruises'

export default function Cruises() {
  const { cruises } = useLoaderData() as Awaited<ReturnType<typeof cruisesLoader>>
  console.log(`${cruises.length} cruises loaded`)

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
        <CruiseList cruises={cruises}/>
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