import { useEffect } from 'react'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import { Link } from "react-router-dom"
import { CruiseName } from '../routes/cruises/data'
import { useInfiniteQuery } from '@tanstack/react-query'
const apiBaseUrl = import.meta.env.VITE_apiBaseUrl

interface Props {
  filters: URLSearchParams
} 

export default function InfiniteCruiseList({filters}:Props) {
  const myFilters = new URLSearchParams(filters)
  myFilters.set('items_per_page', '50')
  console.log('inside InfiniteCruiseList with ',filters.toString())

  const { ref, inView } = useInView()

  // based on example at https://tanstack.com/query/latest/docs/framework/react/examples/load-more-infinite-scroll
const {
  status,
  data,
  error,
  isFetching,
  isFetchingNextPage,
  isFetchingPreviousPage,
  fetchNextPage,
  fetchPreviousPage,
  hasNextPage,
  hasPreviousPage,
} = useInfiniteQuery({
  queryKey: ['infinite cruises', myFilters.toString()],
  queryFn: async ({
    pageParam,
  }): Promise<{
    items: Array<CruiseName>
    page: number
    total_pages: number
    total_items: number
    items_per_page: number
  }> => {
    myFilters.set('page', pageParam.toString())
    const response = await fetch(`${apiBaseUrl}/cruises/name?${myFilters.toString()}`)
    return await response.json()
  },
  initialPageParam: 1,
  getPreviousPageParam: (firstPage) => firstPage.page === 1 ? 1 : firstPage.page - 1,
  getNextPageParam: (lastPage) => lastPage.page === lastPage.total_pages ? lastPage.page : lastPage.page + 1
})

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <div id="scrollingListDiv">
    {isFetching ? (
      <p>Loading...</p>
    ) : status === 'error' ? (
      <span>Error: {error.message}</span>
    ) : (
      <>
        { data && data.pages.map((page) => (
          <React.Fragment key={page.page}>
            {page.items.map((cruise) => (
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