import './table.css'
import { searchParamsToFilters } from '../../utilities'
import { 
  useLoaderData,
 } from "react-router-dom"
import { useQueryClient, useQuery, useQueries, UseQueryResult } from "@tanstack/react-query"

export default function SamplesTable() {
  const queryClient = useQueryClient()
  console.log(queryClient.getDefaultOptions())
  const url = new URL(window.location.href)
  const filters = searchParamsToFilters(url.searchParams)
  console.log('all filters: ', filters.toString())
  
  return(
    <h2>Samples Table</h2>
  )
}