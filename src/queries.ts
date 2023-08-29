import {RepositoryNameResponse, CruiseNameResponse } from './imlgs-types'
const apiBaseUrl = import.meta.env.VITE_apiBaseUrl


const fetchPlatforms = async (filters: URLSearchParams): Promise<string[]> => {
  // create clone and remove the self-referential search param 
  const myFilters = new URLSearchParams(filters)
  myFilters.delete('platform')
  console.log('platform filters: ', myFilters.toString())
  const response = await fetch(`${apiBaseUrl}/platforms?items_per_page=2000&${myFilters.toString()}`)
  if (response.status === 200) {
    const payload = await response.json()
    console.log(`${payload.items.length} platforms`)
    return payload.items as string[]
  } else {
    throw new Error(`${response.status}`)
  }
}


const fetchProvinces = async (filters: URLSearchParams): Promise<string[]> => {
  const myFilters = new URLSearchParams(filters)
  myFilters.delete('province')
  console.log('province filters: ', myFilters.toString())
  const response = await fetch(`${apiBaseUrl}/physiographic_provinces?items_per_page=2000&${myFilters.toString()}`)
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
  const response = await fetch(`${apiBaseUrl}/repositories/name?items_per_page=2000&${myFilters.toString()}`)
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
 const response = await fetch(`${apiBaseUrl}/cruises/name?items_per_page=2000&${myFilters.toString()}`)
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
  const response = await fetch(`${apiBaseUrl}/lakes?items_per_page=2000&${myFilters.toString()}`)
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
  const response = await fetch(`${apiBaseUrl}/devices?items_per_page=2000&${myFilters.toString()}`)
  if (response.status === 200) {
    const paylod = await response.json()
    return paylod.items as string[]
  } else {
    throw new Error(`${response.status}`)
  }
}

const fetchMineralogies = async (filters: URLSearchParams): Promise<string[]> => {
  const myFilters = new URLSearchParams(filters)
  myFilters.delete('mineralogy')
  console.log('platform filters: ', myFilters.toString())
  const response = await fetch(`${apiBaseUrl}/mineralogies?items_per_page=2000&${myFilters.toString()}`)
  if (response.status === 200) {
    const paylod = await response.json()
    return paylod.items as string[]
  } else {
    throw new Error(`${response.status}`)
  }
}

const fetchMetamorphism = async (filters: URLSearchParams): Promise<string[]> => {
  const myFilters = new URLSearchParams(filters)
  myFilters.delete('metamorphism')
  console.log('platform filters: ', myFilters.toString())
  const response = await fetch(`${apiBaseUrl}/metamorphism?items_per_page=2000&${myFilters.toString()}`)
  if (response.status === 200) {
    const paylod = await response.json()
    return paylod.items as string[]
  } else {
    throw new Error(`${response.status}`)
  }
}

const fetchWeathering = async (filters: URLSearchParams): Promise<string[]> => {
  const myFilters = new URLSearchParams(filters)
  myFilters.delete('metamorphism')
  console.log('platform filters: ', myFilters.toString())
  const response = await fetch(`${apiBaseUrl}/weathering?items_per_page=2000&${myFilters.toString()}`)
  if (response.status === 200) {
    const paylod = await response.json()
    return paylod.items as string[]
  } else {
    throw new Error(`${response.status}`)
  }
}

  export { 
    fetchCruiseNames, 
    fetchDevices, 
    fetchLakes, 
    fetchPlatforms, 
    fetchProvinces, 
    fetchRepositoryNames, 
    fetchMineralogies,
    fetchMetamorphism,
    fetchWeathering
  }