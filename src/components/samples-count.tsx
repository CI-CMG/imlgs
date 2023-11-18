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
  
    const { data:totalCount } = useQuery(["totalSampleCount"], fetchTotalSampleCount, {
        staleTime: Infinity
    });
    
    // rename the destructured variable
    const { data: filteredCount} = useQuery(
        ["sampleCount", filters.toString()], 
        async () => fetchSampleCount(filters)
    );
    
    return (
        <div>
            <h3>{(totalCount && filteredCount !== undefined) ? 
          `${filteredCount.toLocaleString()} out of ${totalCount.toLocaleString()} samples` 
          : 'Loading...'}
        </h3>
        </div>
    )
}