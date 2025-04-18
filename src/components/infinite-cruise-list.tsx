import { useState, useEffect } from 'react'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import { Link } from "react-router-dom"
import { CruiseName } from '../routes/cruises/data'
import { searchParamsToFilters } from "../utilities"
import { fetchCruiseNames } from "../queries"
import {
  useInfiniteQuery,
  QueryClient,
  QueryClientProvider,
  useQuery
} from '@tanstack/react-query'
const apiBaseUrl = import.meta.env.VITE_apiBaseUrl

interface Props {
  filters: URLSearchParams
} 

export default function InfiniteCruiseList({filters}:Props) {
  const myFilters = new URLSearchParams(filters)
  myFilters.set('items_per_page', '500')
  // console.log('inside InfiniteCruiseList with ',filters.toString())
  // const results = useQuery({ 
  //   queryKey: ['cruises', filters.toString()],
  //   queryFn: () => fetchCruiseNames(filters) 
  // }) 
  // console.log({results})

  const { ref, inView } = useInView();
  // const [totalPages, setTotalPages] = useState();
  // const [page, setPage] = useState();

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['infinite cruises', myFilters.toString()],
    async ({ pageParam = 1 }) => {
     
      myFilters.set('page', pageParam)
      const res = await fetch(
        `${apiBaseUrl}/cruises/name?${myFilters.toString()}`
      );
      const payload = await res.json()
      return payload
    },
    {
      getNextPageParam: (lastPage,) => {
        if (lastPage.page > lastPage.total_pages) {
          return
        }
        return lastPage.page + 1
      },
    }
  )

  // TODO temporary work around for TypeScript warning
  const myError = error as Error

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <div>
    {status === 'loading' ? (
      <p>Loading...</p>
    ) : status === 'error' ? (
      <span>Error: {myError.message}</span>
    ) : (
      <>
        {data.pages.map((page) => (
          <React.Fragment key={page.page}>
            {page.items.map((cruise:CruiseName) => (
              <Link
              style={{ display: "block", margin: "1rem 0",  textDecoration: "none" }}
              to={`/cruises/${cruise.id}?${filters.toString()}`}
              key={cruise.id} 
              title={`details for cruise ${cruise.id}`} 
              aria-label={`details for cruise ${cruise.id}`}
            >
              {cruise.cruise}
            </Link>
             
            ))}
          </React.Fragment>
        ))}
        <div>
          <button
            ref={ref}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            style={{color: 'black'}}
          >
            {isFetchingNextPage
              ? 'Loading more...'
              : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
          </button>
        </div>
        <div>
          {isFetching && !isFetchingNextPage
            ? 'Background Updating...'
            : null}
        </div>
      </>
    )}    
  </div>
  )
}