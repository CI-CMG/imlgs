// import * as React from 'react';
import React, {useState, useRef } from 'react';
import { useSearchParams } from "react-router-dom";
import {
  useQuery,
  useQueries
} from 'react-query'
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { 
  fetchRepositories, 
  fetchDevices, 
  fetchLakes,
  fetchCruiseNames,
  fetchPlatforms } from '../geosamples-api'
import { extractDefaultFiltersFromUrl } from '../geosamples-utils'
import { Filter} from '../imlgs-types';
import './filter-samples.css'


export default function FilterSamples() {
  console.log('rendering FilterSamples...')
  const baseClass = 'FilterSamples'
  let [searchParams, setSearchParams] = useSearchParams();
  let repository = getSearchParamValue('repository') 
  let platform = getSearchParamValue('platform')
  let device = getSearchParamValue('device') 
  let cruise = getSearchParamValue('cruise') 
  let lake = getSearchParamValue('lake')
  let startDate = getSearchParamValue('start_date')
  let minDepth = getSearchParamValue('min_depth')
  let maxDepth = getSearchParamValue('max_depth')


  function getSearchParamValue(name:string) {
    return (searchParams.has(name))? searchParams.get(name) as string : ''
    
    // more verbose type narrowing better than typecasting?
    // let returnVal = searchParams.get(name)
    // return (typeof returnVal === 'string') ? returnVal : ''
  }

  // TODO re-visit. perhaps get from searchParams
  const url = new URL(location.href)
  // key/value pairs of any URL search parameters used to filter samples
  const filterDefaults = extractDefaultFiltersFromUrl(url)
  console.log('filterDefaults: ', filterDefaults)

  
  // execute queries used to populate Select components
  const results = useQueries([
    { queryKey: ['repositories', filterDefaults], queryFn: fetchRepositories },
    { queryKey: ['platforms', filterDefaults], queryFn: fetchPlatforms },
    { queryKey: ['lakes', filterDefaults], queryFn: fetchLakes },
    { queryKey: ['devices', filterDefaults], queryFn: fetchDevices },
    { queryKey: ['cruises', filterDefaults], queryFn: fetchCruiseNames },
  ])
  const queriesComplete = results.every(it => it.isSuccess)
  let repositories = (results[0].data) ? results[0].data : []
  let platforms = (results[1].data) ? results[1].data : []
  // lakes is only one of the selects which may have 0 options
  let lakes = (results[2].data?.length) ? results[2].data : []
  let devices = (results[3].data) ? results[3].data : []
  let cruises = (results[4].data?.length) ? results[4].data : []
  console.log('results: ', results)


  const handleRepositoryChange = (event:SelectChangeEvent<string>, child:React.ReactNode) => {
    // let formData = new FormData(event.currentTarget);
    let repository = event.target.value
    let newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('repository', repository)
    setSearchParams(newSearchParams);
  };


  const handlePlatformChange = (event:SelectChangeEvent<string>, child:React.ReactNode) => {
    let platform = event.target.value
    let newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('platform', platform)
    setSearchParams(newSearchParams);
  };


  const handleCruiseChange = (event:SelectChangeEvent<string>, child:React.ReactNode) => {
    let cruise = event.target.value
    let newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('cruise', cruise)
    setSearchParams(newSearchParams);
  };


  const handleLakeChange = (event:SelectChangeEvent<string>, child:React.ReactNode) => {
    let lake = event.target.value
    let newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('lake', lake)
    setSearchParams(newSearchParams);
  };


  const handleDeviceChange = (event:SelectChangeEvent<string>, child:React.ReactNode) => {
    let device = event.target.value
    let newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('device', device)
    setSearchParams(newSearchParams);
  };


  const handleResetFilterBtn = (event:React.MouseEvent<HTMLElement>) => {
    // console.log('Reset Filters button clicked ',event )
    let newSearchParams = new URLSearchParams(searchParams)
    const searchParamNames = ['repository', 'platform', 'device', 'cruise', 'lake', 'start_date', 'min_depth', 'max_depth']
    searchParamNames.forEach(name => {
      if (searchParams.has(name)) {
        newSearchParams.delete(name)
      }
    });
    setSearchParams(newSearchParams);
    // TODO why is change in search parameter not resetting this
    const startDateTextEntry = document.getElementById('date-text')
    startDateTextEntry.value = ''
  }


  const handleDateChange = (event:React.FocusEvent<HTMLInputElement>) => {
    console.log('start_date changed to ', event.target.value)
    if (event.target.value.length >= 4 && event.target.value.length <= 8) {
      let newSearchParams = new URLSearchParams(searchParams)
      newSearchParams.set('start_date', event.target.value)
      setSearchParams(newSearchParams);
        
    } else {
      console.log('invalid date')
    }
  }

  const handleMinDepthChange = (event:React.FocusEvent<HTMLInputElement>) => {

  }

  const handleMaxDepthChange = (event:React.FocusEvent<HTMLInputElement>) => {

  }

  const checkForReturnKey = (event:React.KeyboardEvent<HTMLInputElement>) => {
    console.log('value: ', event.target.value)
    if (event.key === 'Enter') {
      console.log('Enter key pressed, blur field')
    }
  }

  let a = [1,2,'a']

  return(
        <div id="filterPanel">
        
        {queriesComplete ? 
          <>
          <FormControl fullWidth variant='standard' sx={{paddingBottom: '15px'}}>
            <InputLabel id="repository-select-label">Repository</InputLabel>
            <Select
              labelId="repository-select-label"
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

          <FormControl fullWidth variant='standard' sx={{paddingBottom: '15px'}}>
            <InputLabel id="platform-select-label">Platform</InputLabel>
            <Select
              labelId="platform-select-label"
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

          <FormControl fullWidth variant='standard' sx={{paddingBottom: '15px'}}>
            <InputLabel id="device-select-label">Device</InputLabel>
            <Select
              labelId="device-select-label"
              id="device-select"
              value={device}
              label="Device"
              onChange={handleDeviceChange}
              size='small'
            >
              {devices.map(name => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
            </Select>
          </FormControl>

          <FormControl fullWidth variant='standard' sx={{paddingBottom: '15px'}}>
            <InputLabel id="cruise-select-label">Cruise</InputLabel>
            <Select
              labelId="cruise-select-label"
              id="cruise-select"
              value={cruise}
              label="Cruise"
              onChange={handleCruiseChange}
              size='small'
            >
              {cruises.map(name => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
            </Select>
          </FormControl>

          </>
          : ''}
        {lakes && lakes.length ? 
          <FormControl fullWidth variant='standard' sx={{paddingBottom: '15px'}}>
          <InputLabel id="lake-select-label">Lake</InputLabel>
          <Select
            labelId="lake-select-label"
            id="lake-select"
            value={lake}
            label="Lake"
            onChange={handleLakeChange}
            size='small'
          >
            {lakes.map(name => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
          </Select>
          </FormControl>
      : ''}

      <TextField 
        id="date-text" label="Date" variant="standard" helperText="YYYYMMDD" 
        onBlur={handleDateChange} defaultValue={startDate} onKeyDown={checkForReturnKey}
        sx={{width:'70px', paddingBottom:"5px"}} size="small"
      />
      
      <div style={{display: "flex", justifyContent: "space-around", alignItems:"center"}}>
        <span>Water Depth (m)</span>  
        <TextField 
        id="mindepth-text" label="Min" variant="standard" size='small'
        onBlur={handleMinDepthChange} defaultValue={minDepth} onKeyDown={checkForReturnKey}
        sx={{marginBottom: '5px', width:'60px'}} />
        <span style={{}}>to</span>
      
         <TextField 
        id="maxdepth-text" label="Max" variant="standard"
        onBlur={handleMaxDepthChange} defaultValue={maxDepth} onKeyDown={checkForReturnKey}
        sx={{marginBottom: '5px', width:"60px"}} size="small" />
      </div>

      <div style={{display: "flex", justifyContent: "center", marginTop: "25px", width:"100%"}}>
          <Button variant="contained" onClick={handleResetFilterBtn}>Reset Filters</Button>
      </div>
        </div>
  );
}