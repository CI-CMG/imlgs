import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, Route, Routes, useSearchParams } from "react-router-dom";
import {
  useQuery,
  useQueries,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from 'react-query'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { fetchTotalSampleCount, fetchFilteredSampleCount, fetchAllRepositories, fetchFilteredRepositories, fetchFilteredPlatforms } from '../geosamples-api'
import { extractDefaultFiltersFromUrl } from '../geosamples-utils'
import FilterSamples from '../components/FilterSamples';
import './samples.css'


export default function Samples() {
  const baseClass = 'Samples'
  console.log('rendering Samples...')
  // const [filterString, setFilterString] = useState()
  let [searchParams, setSearchParams] = useSearchParams();
  let repository = (searchParams.get("repository"))? searchParams.get("repository") : '' 
  let platform = (searchParams.get("platform"))? searchParams.get("platform") : '' 

  const url = new URL(location.href)
  // key/value pairs of any URL search parameters used to filter samples
  const filterDefaults = extractDefaultFiltersFromUrl(url)
  console.log('filterDefaults: ', filterDefaults)

  // const queryClient = useQueryClient()
  const { data:totalCount, error, status} = useQuery(["totalSampleCount"], fetchTotalSampleCount, {
    staleTime: Infinity
  });

  // rename the destructured variable
  // const { data: filtered, error: error1, status: status1} = useQuery(["filteredSampleCount", filterDefaults], fetchFilteredSampleCount);
  // console.log('filtered count:', (filtered) ? filtered.count: 'not available')


  // const { data:repositories, error: error2, status: status2} = useQuery(["filteredRepositories", filterDefaults], fetchFilteredRepositories);
  // console.log('repositories: ', repositories)

  // const { data:platforms, error: error3, status: status3} = useQuery(["filteredPlatforms", filterDefaults], fetchFilteredPlatforms);
  // console.log('platforms: ', platforms)

  const results = useQueries([
    { queryKey: ['filteredCount', filterDefaults], queryFn: fetchFilteredSampleCount },
    { queryKey: ['filteredRepositories', filterDefaults], queryFn: fetchFilteredRepositories },
    { queryKey: ['filteredPlatforms', filterDefaults], queryFn: fetchFilteredPlatforms },
  ])
  const queriesComplete = results.every(it => it.isSuccess)
  let filteredCount = (results[0].data) ? results[0].data.count : undefined
  let repositories = (results[1].data) ? results[1].data : undefined
  let platforms = (results[2].data) ? results[2].data : undefined

  console.log('results: ', results)


  const handleRepositoryChange = (event) => {
    // setRepository(event.target.value);
    // let formData = new FormData(event.currentTarget);
    let repository = event.target.value as string;
    let newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('repository', repository)
    setSearchParams(newSearchParams);
  };


  const handlePlatformChange = (event) => {
    let platform = event.target.value as string;
    let newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('platform', platform)
    setSearchParams(newSearchParams);
  };


  return (
    <div className={`${baseClass}--wrapper`}>
      <nav className={`${baseClass}--sidebar`}>
        <h2>{(totalCount && filteredCount) ? 
          `${filteredCount.toLocaleString()} out of ${totalCount.count.toLocaleString()}` 
          : 'Loading...'}
        </h2>
        <div>
        {status === "error" && <div>{error!.message}</div>}
        {status === "loading" && <div>Loading...</div>}
        </div>
      
        <div id="filterPanel">
        
        {repositories ? 
        <FormControl fullWidth variant='standard' sx={{paddingBottom: '15px'}}>
          <InputLabel id="repository-select-label">Repository</InputLabel>
            <Select
              labelId="repository-select-select-label"
              id="repository-select"
              value={repository}
              label="Repository"
              onChange={handleRepositoryChange}
              size='small'
            >
              {repositories.map(option => (
              <MenuItem key={option.facility_code} value={option.facility_code}>
                {option.facility}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
          : ''}

        {platforms ?
        <FormControl fullWidth variant='standard' sx={{paddingBottom: '15px'}}>
          <InputLabel id="platform-select-label">Platform</InputLabel>
          <Select
            labelId="platform-select-select-label"
            id="platform-select"
            value={platform}
            label="Platform"
            onChange={handlePlatformChange}
            size='small'
          >
            {platforms.map(name => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
          </Select>

        </FormControl>
        : '' }
        </div>
        <FilterSamples/>
      </nav>
      <main className={`${baseClass}--main`}>
        <h3>map goes here</h3>
      </main>
    </div>
    );
}