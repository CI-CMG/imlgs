import {RepositoryNameResponse, CruiseNameResponse } from './imlgs-types'


const fetchPlatforms = async (filters: URLSearchParams): Promise<string[]> => {
  // create clone and remove the self-referential search param 
  const myFilters = new URLSearchParams(filters)
  myFilters.delete('platform')
  console.log('platform filters: ', myFilters.toString())
  const response = await fetch(`https://ccog.colorado.edu/geosamples-api/api/platforms?items_per_page=2000&${myFilters.toString()}`)
  if (response.status === 200) {
    const payload = await response.json()
    return payload.items as string[]
  } else {
    throw new Error(`${response.status}`)
  }
}


const fetchProvinces = async (filters: URLSearchParams): Promise<string[]> => {
  const myFilters = new URLSearchParams(filters)
  myFilters.delete('province')
  console.log('province filters: ', myFilters.toString())
  const response = await fetch(`https://ccog.colorado.edu/geosamples-api/api/physiographic_provinces?items_per_page=2000&${myFilters.toString()}`)
  if (response.status === 200) {
    const payload = await response.json()
    return payload.items as string[]
  } else {
    throw new Error(`${response.status}`)
  }
}


const fetchRepositoryNames = async (filters: URLSearchParams): Promise<string[]> => {
  const myFilters = new URLSearchParams(filters)
  myFilters.delete('repository')
  console.log('repository filters: ', myFilters.toString())
  const response = await fetch(`https://ccog.colorado.edu/geosamples-api/api/repositories/name?items_per_page=2000&${myFilters.toString()}`)
  if (response.status === 200) {
    const payload: RepositoryNameResponse = await response.json()
    return payload.items.map(item => item.facility_code)
  } else {
    throw new Error(`${response.status}`)
  }
}

const fetchCruiseNames = async (filters: URLSearchParams): Promise<string[]> => {
 const myFilters = new URLSearchParams(filters)
 myFilters.delete('cruise')  
 console.log('cruise filters: ', myFilters.toString())
 const response = await fetch(`https://ccog.colorado.edu/geosamples-api/api/cruises/name?items_per_page=2000&${myFilters.toString()}`)
  if (response.status === 200) {
    const payload: CruiseNameResponse = await response.json()
    const cruises = payload.items.map(item => item.cruise)
    console.log('returning ', cruises)
    return cruises
  } else {
    throw new Error(`${response.status}`)
  }
}


const fetchLakes = async (filters: URLSearchParams): Promise<string[]> => {
  const myFilters = new URLSearchParams(filters)
  myFilters.delete('lake')
  console.log('lake filters: ', myFilters.toString())
  const response = await fetch(`https://ccog.colorado.edu/geosamples-api/api/lakes?items_per_page=2000&${myFilters.toString()}`)
  if (response.status === 200) {
    const paylod = await response.json()
    return paylod.items as string[]
  } else {
    throw new Error(`${response.status}`)
  }
}


const fetchDevices = async (filters: URLSearchParams): Promise<string[]> => {
  const myFilters = new URLSearchParams(filters)
  myFilters.delete('device')
  console.log('platform filters: ', myFilters.toString())
  const response = await fetch(`https://ccog.colorado.edu/geosamples-api/api/devices?items_per_page=2000&${myFilters.toString()}`)
  if (response.status === 200) {
    const paylod = await response.json()
    return paylod.items as string[]
  } else {
    throw new Error(`${response.status}`)
  }
}

export { fetchCruiseNames, fetchDevices, fetchLakes, fetchPlatforms, fetchProvinces, fetchRepositoryNames }