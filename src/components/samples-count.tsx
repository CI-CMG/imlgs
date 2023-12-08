import {
    useQuery,
    useQueries,
    useQueryClient,
    QueryClient,
    QueryClientProvider
} from "@tanstack/react-query"
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import { fetchTotalSampleCount, fetchSampleCount} from '../queries'
import { searchParamsToFilters } from "../utilities"


export default function SamplesCount() {
    // console.log('rendering SamplesCount...')
    const baseClass = 'SamplesCount'
    const url = new URL(window.location.href)
    const filters = searchParamsToFilters(url.searchParams)
    // console.log('SampleCount: ', filters.toString())
  
    const results = useQueries({
        queries: [ 
            { queryKey: ['totalSampleCount'], queryFn: () => fetchTotalSampleCount(), staleTime: Infinity },        
            { queryKey: ['filteredCount', filters.toString()], queryFn: () => fetchSampleCount(filters) }
        ]
    })    


    function getMessage() {
        if (results.every(it => it.isSuccess)) {
            return(`${results[1].data?.toLocaleString()} out of ${results[0].data?.toLocaleString()} samples`)
        }
        // if (results[0].isSuccess) {
        //     return (`${results[0].data?.toLocaleString()} samples`)
        // }
        if (results.some(it => it.isError)) {
            return (`error retrieving data - please try again`)
        }
        return ('Loading...')
    }

    return (
        <div>
            <h3>{getMessage()}</h3>
        </div>
    )
}