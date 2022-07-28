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
import { fetchTotalSampleCount, fetchSampleCount, fetchDepthRange} from '../geosamples-api'
import { extractDefaultFiltersFromUrl, extractDefaultFiltersFromSearchParams } from '../geosamples-utils'
import './depth-range.css'


export default function DepthRange() {
    const baseClass = 'DepthRange'
    let [searchParams, setSearchParams] = useSearchParams();
    let filterDefaults = extractDefaultFiltersFromSearchParams(searchParams)

    // rename the destructured variable
    const { data, error, status} = useQuery(["depthRange", filterDefaults], fetchDepthRange);
    console.log(data)
    
    return (
        <div className={baseClass}>
            {(data && data.min != null && data.max != null) ? 
           <span className={`${baseClass}--title`}>{`water depths from ${data.min.toLocaleString()} to ${data.max.toLocaleString()} meters`}</span> 
          : ''}
        </div>
    )
}