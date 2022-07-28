import {
    useQuery,
    useQueries,
    useQueryClient,
    QueryClient,
    QueryClientProvider
} from 'react-query'
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import { fetchTotalSampleCount, fetchSampleCount} from '../geosamples-api'
import { extractDefaultFiltersFromUrl, extractDefaultFiltersFromSearchParams } from '../geosamples-utils'


export default function SamplesCount() {
    console.log('rendering SamplesCount...')
    const baseClass = 'SamplesCount'
    let [searchParams, setSearchParams] = useSearchParams();
    let filterDefaults = extractDefaultFiltersFromSearchParams(searchParams)

    const { data:totalCount, error, status} = useQuery(["totalSampleCount"], fetchTotalSampleCount, {
        staleTime: Infinity
    });
    
    // rename the destructured variable
    const { data: filteredCount, error: error1, status: status1} = useQuery(["sampleCount", filterDefaults], fetchSampleCount);
    
    return (
        <div>
            <h3>{(totalCount && filteredCount) ? 
          `${filteredCount.toLocaleString()} out of ${totalCount.toLocaleString()} samples` 
          : 'Loading...'}
        </h3>
        </div>
    )
}