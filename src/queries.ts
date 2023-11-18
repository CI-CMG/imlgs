import {RepositoryNameResponse, CruiseNameResponse } from './imlgs-types'
const apiBaseUrl = import.meta.env.VITE_apiBaseUrl


const fetchPlatforms = async (filters: URLSearchParams): Promise<string[]> => {
  // create clone and remove the self-referential search param 
  const myFilters = new URLSearchParams(filters)
  myFilters.delete('platform')
  // console.log('platform filters: ', myFilters.toString())
  const response = await fetch(`${apiBaseUrl}/platforms?items_per_page=2000&${myFilters.toString()}`)
  if (response.status === 200) {
    const payload = await response.json()
    // console.log(`${payload.items.length} platforms`)
    return payload.items as string[]
  } else {
    throw new Error(`${response.status}`)
  }
}


const fetchProvinces = async (filters: URLSearchParams): Promise<string[]> => {
  const myFilters = new URLSearchParams(filters)
  myFilters.delete('province')
  // console.log('province filters: ', myFilters.toString())
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
  // console.log('repository filters: ', myFilters.toString())
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
//  console.log('cruise filters: ', myFilters.toString())
 const response = await fetch(`${apiBaseUrl}/cruises/name?items_per_page=2000&${myFilters.toString()}`)
  if (response.status === 200) {
    const payload: CruiseNameResponse = await response.json()
    const cruises = payload.items.map(item => item.cruise)
    return cruises
  } else {
    throw new Error(`${response.status}`)
  }
}


const fetchLakes = async (filters: URLSearchParams): Promise<string[]> => {
  const myFilters = new URLSearchParams(filters)
  myFilters.delete('lake')
  // console.log('lake filters: ', myFilters.toString())
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
  // console.log('platform filters: ', myFilters.toString())
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
  // console.log('platform filters: ', myFilters.toString())
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
  // console.log('platform filters: ', myFilters.toString())
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
  myFilters.delete('weathering')
  // console.log('platform filters: ', myFilters.toString())
  const response = await fetch(`${apiBaseUrl}/weathering?items_per_page=2000&${myFilters.toString()}`)
  if (response.status === 200) {
    const paylod = await response.json()
    return paylod.items as string[]
  } else {
    throw new Error(`${response.status}`)
  }
}

async function fetchTotalSampleCount(): Promise<number> {
  const response = await fetch(`${apiBaseUrl}/samples/count`)
  // Fetch API doesn't consider 404 responses to be errors
  if (! response.ok) {
      throw new Error(response.statusText)
  }
  const data = await response.json()
  return parseInt(data.count)
}

const fetchLithologies = async (filters: URLSearchParams): Promise<string[]> => {
  const myFilters = new URLSearchParams(filters)
  myFilters.delete('lithology')
  // console.log('platform filters: ', myFilters.toString())
  const response = await fetch(`${apiBaseUrl}/lithologies?items_per_page=2000&${myFilters.toString()}`)
  if (response.status === 200) {
    const paylod = await response.json()
    return paylod.items as string[]
  } else {
    throw new Error(`${response.status}`)
  }
}

const fetchRockLithologies = async (filters: URLSearchParams): Promise<string[]> => {
  const myFilters = new URLSearchParams(filters)
  myFilters.delete('rock_lithology')
  // console.log('platform filters: ', myFilters.toString())
  const response = await fetch(`${apiBaseUrl}/rock_lithologies?items_per_page=2000&${myFilters.toString()}`)
  if (response.status === 200) {
    const paylod = await response.json()
    return paylod.items as string[]
  } else {
    throw new Error(`${response.status}`)
  }
}

const fetchRemarks = async (filters: URLSearchParams): Promise<string[]> => {
  const myFilters = new URLSearchParams(filters)
  myFilters.delete('remark')
  // console.log('platform filters: ', myFilters.toString())
  const response = await fetch(`${apiBaseUrl}/remarks?items_per_page=2000&${myFilters.toString()}`)
  if (response.status === 200) {
    const paylod = await response.json()
    return paylod.items as string[]
  } else {
    throw new Error(`${response.status}`)
  }
}

const fetchCompositions = async (filters: URLSearchParams): Promise<string[]> => {
  const myFilters = new URLSearchParams(filters)
  myFilters.delete('composition')
  // console.log('platform filters: ', myFilters.toString())
  const response = await fetch(`${apiBaseUrl}/compositions?items_per_page=2000&${myFilters.toString()}`)
  if (response.status === 200) {
    const paylod = await response.json()
    return paylod.items as string[]
  } else {
    throw new Error(`${response.status}`)
  }
}

const fetchTextures = async (filters: URLSearchParams): Promise<string[]> => {
  const myFilters = new URLSearchParams(filters)
  myFilters.delete('texture')
  // console.log('platform filters: ', myFilters.toString())
  const response = await fetch(`${apiBaseUrl}/textures?items_per_page=2000&${myFilters.toString()}`)
  if (response.status === 200) {
    const paylod = await response.json()
    return paylod.items as string[]
  } else {
    throw new Error(`${response.status}`)
  }
}
/*
const fetchLithologies = async (filters: URLSearchParams): Promise<string[]> => {
  // TODO hardcoded values pending API bug fix
  return [
    'calcareous, algae',
    'calcareous, biogenic',
    'calcareous, coral',
    'calcareous, foraminifera',
    'calcareous, nannofossils',
    'calcareous, nonbiogenic',
    'calcareous, oolites',
    'calcareous, ostracods',
    'calcareous, pteropods',
    'calcareous, shells',
    'calcareous, spines',
    'siliceous',
    'siliceous, diatoms',
    'siliceous, radiolaria',
    'siliceous, sponge spicules',
    'terrigenous',
    'terrigenous clastic sedimentary rock',
    'clay minerals',
    'fish teeth',
    'glauconite',
    'iron or iron oxide',
    'manganese',
    'opaques',
    'phosphate',
    'plant debris',
    'pyrite or marcasite',
    'zeolites'
  ]
}
*/

/*
const fetchTextures = async (filters: URLSearchParams): Promise<string[]> => {
  return [
    'gravel',
    'gravelly mud',
    'gravelly sand',
    'mud or ooze',
    'muddy gravel',
    'muddy sand',
    'sand',
    'sandy gravel',
    'sandy mud or ooze',
    'ash',
    'breccia',
    'crusts',
    'dolomite',
    'glass shards',
    'lapilli',
    'nodules',
    'slabs',
    'volcanics'
  ]
}
*/
  
  const fetchSampleCount = async (filters: URLSearchParams): Promise<number> => {
  const response = await fetch(`${apiBaseUrl}/samples/count?${filters.toString()}`)
  if (response.status === 200) {
    const paylod = await response.json()
    return paylod.count as number
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
    fetchLithologies,
    fetchTextures,
    fetchWeathering,
    fetchCompositions,
    fetchRockLithologies,
    fetchRemarks,
    fetchTotalSampleCount,
    fetchSampleCount
  }