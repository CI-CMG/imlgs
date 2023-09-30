// import * as React from 'react';
import React, {useState, useRef } from 'react';
import { useSearchParams, Link } from "react-router-dom";
import {
  useQuery,
  useQueries
} from 'react-query'
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { 
  fetchRepositories, 
  fetchDevices, 
  fetchLakes,
  fetchCruiseNames,
  fetchPlatforms,
  fetchProvinces
 } from '../geosamples-api'
import { extractDefaultFiltersFromUrl } from '../geosamples-utils'
import { Filter} from '../imlgs-types';
import './filter-samples.css'
import { ContentPasteOffSharp } from '@mui/icons-material';
import { Input } from '@mui/material';


export default function FilterSamples({zoomToSelected, zoomToggleHandler}) {
  console.log('rendering FilterSamples...')
  const baseClass = 'FilterSamples'
  let [searchParams, setSearchParams] = useSearchParams();
  console.log('setting values from searchParams...')
  let repository = getSearchParamValue('repository') 
  let platform = getSearchParamValue('platform')
  let device = getSearchParamValue('device') 
  let cruise = getSearchParamValue('cruise') 
  let lake = getSearchParamValue('lake')
  let startDate = getSearchParamValue('date')
  let minDepth = getSearchParamValue('min_depth')
  let maxDepth = getSearchParamValue('max_depth')
  let igsn = getSearchParamValue('igsn')
  let province = getSearchParamValue('province')
  let sampleId = getSearchParamValue('sampleid')

  const minDepthInput = useRef(null)
  const maxDepthInput = useRef(null)
  const dateInput = useRef(null)
  const igsnInput = useRef(null)
  const provinceInput = useRef(null)
  const sampleIdInput = useRef(null)
  const filterPanel = useRef(null)

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
    { queryKey: ['provinces', filterDefaults], queryFn: fetchProvinces },
  ])
  const queriesComplete = results.every(it => it.isSuccess)
  let repositories = (results[0].data) ? results[0].data : []
  // if a select's options list contains only one value, make it the active one
  if (repositories.length == 1) { repository = repositories[0].facility_code }

  let platforms = (results[1].data) ? results[1].data : []
  if (platforms.length == 1) { platform = platforms[0] }

  // lakes is only one of the selects which may have 0 options
  let lakes = (results[2].data?.length) ? results[2].data : []
  if (lakes.length == 1) { lake = lake[0] }

  let devices = (results[3].data) ? results[3].data : []
  if (devices.length == 1) { device = devices[0] }
  
  let cruises = (results[4].data?.length) ? results[4].data : []
  if (cruises.length == 1) { cruise = cruises[0].cruise }
  console.log({cruises})

  let provinces = (results[5].data?.length) ? results[5].data : []
  if (provinces.length == 1) { province = provinces[0] }


  // console.log('results: ', results)


  const handleRepositoryChange = (event:SelectChangeEvent<string>, child:React.ReactNode) => {
    let newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('repository', event.target.value)
    setSearchParams(newSearchParams);
  };


  const handlePlatformChange = (event:SelectChangeEvent<string>, child:React.ReactNode) => {
    let newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('platform', event.target.value)
    setSearchParams(newSearchParams);
  };


  const handleCruiseChange = (event:SelectChangeEvent<string>, child:React.ReactNode) => {
    let newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('cruise', event.target.value)
    setSearchParams(newSearchParams);
  };


  const handleLakeChange = (event:SelectChangeEvent<string>, child:React.ReactNode) => {
    let newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('lake', event.target.value)
    setSearchParams(newSearchParams);
  };


  const handleDeviceChange = (event:SelectChangeEvent<string>, child:React.ReactNode) => {
    let newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('device', event.target.value)
    setSearchParams(newSearchParams);
  };

  const handleProvinceChange = (event:SelectChangeEvent<string>, child:React.ReactNode) => {
    let newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('province', event.target.value)
    setSearchParams(newSearchParams)
  }

  const handleResetFilterBtn = (event:React.MouseEvent<HTMLElement>) => {
    // console.log('Reset Filters button clicked ',event )
    let newSearchParams = new URLSearchParams(searchParams)
    const searchParamNames = ['repository', 'platform', 'device', 'cruise', 'lake', 'date', 'min_depth', 'max_depth', 'igsn', 'province', 'sampleid']
    searchParamNames.forEach(name => {
      if (searchParams.has(name)) {
        newSearchParams.delete(name)
      }
    });
    setSearchParams(newSearchParams);
    dateInput.current.value = ''
    minDepthInput.current.value = ''
    // minDepthInput.current.defaultValue = ''
    maxDepthInput.current.value = ''
    igsnInput.current.value = ''
    sampleIdInput.current.value = ''
  }


  const handleDateChange = (event:React.FocusEvent<HTMLInputElement>) => {
    if (event.target.value === '') { return }
    if (event.target.value.length >= 4 && event.target.value.length <= 8) {
      let newSearchParams = new URLSearchParams(searchParams)
      newSearchParams.set('date', event.target.value)
      setSearchParams(newSearchParams);
        
    } else {
      console.log('invalid date')
    }
  }

  const handleMinDepthChange = (event:React.FocusEvent<HTMLInputElement>) => {
    if (event.target.value === '') { return }
    let newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('min_depth', event.target.value)
    setSearchParams(newSearchParams);
  }

  const handleMaxDepthChange = (event:React.FocusEvent<HTMLInputElement>) => {
    if (event.target.value === '') { return }
    let newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('max_depth', event.target.value)
    setSearchParams(newSearchParams);

  }

  const handleIgsnChange = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.value === '') { return }
    // if igsn found in samples set IGSN parameter
    // else if igsn found in intervals set IMLGS parameter
    let newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('igsn', event.target.value)
    setSearchParams(newSearchParams)
  }

  const handleSampleIdChange = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.value === '') { return }
    let newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('sampleid', event.target.value)
    setSearchParams(newSearchParams)
  }

  // const handleZoomToSelectedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setZoomToSelected(event.target.checked)
  // }


  const checkForReturnKey = (event:React.KeyboardEvent<HTMLInputElement>) => {
    console.log('inside checkForReturnKey...')
    console.log(event.target)
    if (event.key === 'Enter') {
      event.target.blur()
    }
  }


  return (
    <div ref={filterPanel}>
        
        {/* {queriesComplete ?  */}
          <>
          <FormControl fullWidth variant='standard' sx={{paddingBottom: '15px'}}>
            <InputLabel id="repository-select-label">Repository</InputLabel>
            <Select
              labelId="repository-select-label"
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

          { cruises && cruises.length && cruises.length < 500 ?
          <FormControl fullWidth variant='standard' sx={{paddingBottom: '15px'}}>
            <InputLabel id="cruise-select-label">Cruise</InputLabel>
            <Select
              labelId="cruise-select-label"
              value={cruise}
              label="Cruise"
              onChange={handleCruiseChange}
              size='small'
            >
              {cruises.map(item => (
              <MenuItem key={item.id} value={item.cruise}>
                {item.cruise}
              </MenuItem>
            ))}
            </Select>
          </FormControl>
          : '' }

          </>
          {/* : ''} */}
        {lakes && lakes.length ? 
          <FormControl fullWidth variant='standard' sx={{paddingBottom: '15px'}}>
          <InputLabel id="lake-select-label">Lake</InputLabel>
          <Select
            labelId="lake-select-label"
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

        {provinces && provinces.length ? 
          <FormControl fullWidth variant='standard' sx={{paddingBottom: '15px'}}>
            <InputLabel id="device-select-label">Physiographic Province</InputLabel>
            <Select
              labelId="province-select-label"
              value={province}
              label="Physiographic Province"
              onChange={handleProvinceChange}
              size='small'
            >
              {provinces.map(name => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
            </Select>
          </FormControl>
        : ''}

      <TextField 
        id="date-text" label="Date" variant="standard" helperText="YYYYMMDD" inputRef={dateInput}
        onBlur={handleDateChange} defaultValue={startDate} onKeyDown={checkForReturnKey}
        sx={{width:'70px', paddingBottom:"5px"}} size="small"
      />
      
      <div style={{display: "flex", justifyContent: "space-around", alignItems:"center"}}>
        <span>Water Depth (m)</span>  
        <TextField 
        label="Min" variant="standard" size='small' inputRef={minDepthInput}
        onBlur={handleMinDepthChange} defaultValue={minDepth} onKeyDown={checkForReturnKey}
        sx={{marginBottom: '5px', width:'60px'}} />

        <span>to</span>
      
         <TextField 
        id="maxdepth-text" label="Max" variant="standard" size='small' inputRef={maxDepthInput}
        onBlur={handleMaxDepthChange} defaultValue={maxDepth} onKeyDown={checkForReturnKey} 
        sx={{marginBottom: '5px', width:"60px"}} />
      </div>

      {/* <div>
      <TextField 
        id="igsn-text" label="IGSN" variant="standard" inputRef={igsnInput}
        onBlur={handleIgsnChange} defaultValue={igsn} onKeyDown={checkForReturnKey}
        sx={{width:'120px', paddingBottom:"5px"}} size="small"
      />
      </div>

      <div>
      <TextField 
        id="sampleid-text" label="Sample Id" variant="standard" inputRef={sampleIdInput}
        onBlur={handleSampleIdChange} defaultValue={sampleId} onKeyDown={checkForReturnKey}
        sx={{width:'120px', paddingBottom:"5px"}} size="small"
      />
      </div> */}

      <div style={{display: "flex", justifyContent: "center", marginTop: "25px", width:"100%"}}>
          <Button variant="contained" onClick={handleResetFilterBtn}>Reset Filters</Button>
      </div>
      
      <div style={{paddingTop: "25px"}}>
        <FormControlLabel control={
          <Switch checked={zoomToSelected} onChange={zoomToggleHandler}/>
          } label="zoom to search results" />
      </div>

      {/* TODO open table in new tab or same one? */}
      <div style={{display: "flex", justifyContent: "left", marginTop: "25px", width:"100%"}}>
        <Button variant="contained" target="_blank" component={Link} to={'table?'+searchParams.toString()}>Table View</Button>
      </div>
    </div>
  );
}