
const apiBaseUrl = 'https://www.ngdc.noaa.gov/geosamples-api'

type Params = {
    queryKey: [string, { id: number }];
};


const fetchTotalSampleCount = async () => {
    const response = await fetch(`${apiBaseUrl}/samples?count_only=true`)
    // Fetch API doesn't consider 404 responses to be errors
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}


async function fetchRepositoryById({queryKey}) {
    const [_key, { repositoryId}] = queryKey
    const response = await fetch(`${apiBaseUrl}/repositories/${repositoryId}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}


async function fetchAllRepositories() {
    const response = await fetch(`${apiBaseUrl}/repositories?name_only=true`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}


function createSearchParamsString(defaultParams:Array<string>, validFilterKeys:Array<string>, filters:Array<string>){
    let queryStrings = [...defaultParams]

    for (const [key, value] of Object.entries(filters)) {
        if (validFilterKeys.includes(key)) {
            queryStrings.push(`${key}=${value}`)
        }
    }
    if (queryStrings.length) {
        return ('?'+ queryStrings.join('&'))
    } else {
        return queryStrings.join('&')
    }
}


async function fetchRepositories({queryKey}) {
    // API ignores invalid search params but this makes explicit what is supported in this context
    const valid_filterKeys = ['platform', 'lake', 'cruise', 'device']

    const [, filters] = queryKey
    let queryStrings = ['name_only=true']
    for (const [key, value] of Object.entries(filters)) {
        if (valid_filterKeys.includes(key)) {
            queryStrings.push(`${key}=${value}`)
        }
    }
    console.log('new value: ', createSearchParamsString(queryStrings, valid_filterKeys, filters))
    
    const response = await fetch(`${apiBaseUrl}/repositories?${queryStrings.join('&')}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}


async function fetchPlatforms({queryKey}) {
    // API ignores invalid search params but this makes explicit what is supported in this context
    const valid_filterKeys = ['repository', 'lake', 'cruise', 'device']

    const [, filters] = queryKey
    // no "name_only" option for platforms
    let queryStrings = []
    
    for (const [key, value] of Object.entries(filters)) {
        if (valid_filterKeys.includes(key)) {
            queryStrings.push(`${key}=${value}`)
        }
    }
    const searchString = (queryStrings.length) ? `?${queryStrings.join('&')}` : ''  
    const response = await fetch(`${apiBaseUrl}/platforms${searchString}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}


async function fetchLakes({queryKey}) {
    // API ignores invalid search params but this makes explicit what is supported in this context
    const valid_filterKeys = ['repository', 'platform', 'cruise', 'device']

    const [, filters] = queryKey
    // no "name_only" option for lakes
    let queryStrings = []
    
    for (const [key, value] of Object.entries(filters)) {
        if (valid_filterKeys.includes(key)) {
            queryStrings.push(`${key}=${value}`)
        }
    }
    const searchString = (queryStrings.length) ? `?${queryStrings.join('&')}` : ''  
    const response = await fetch(`${apiBaseUrl}/lakes${searchString}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}


async function fetchDevices({queryKey}) {
    // API ignores invalid search params but this makes explicit what is supported in this context
    const valid_filterKeys = ['repository', 'lake', 'platform', 'cruise']

    const [, filters] = queryKey
    // no "name_only" option for lakes
    let queryStrings = []
    
    for (const [key, value] of Object.entries(filters)) {
        if (valid_filterKeys.includes(key)) {
            queryStrings.push(`${key}=${value}`)
        }
    }
    const searchString = (queryStrings.length) ? `?${queryStrings.join('&')}` : ''  
    const response = await fetch(`${apiBaseUrl}/devices${searchString}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}


async function fetchSampleCount({queryKey}) {
    const [, filters] = queryKey
    let queryStrings = ['count_only=true']
    for (const [key, value] of Object.entries(filters)) {
        queryStrings.push(`${key}=${value}`)
    }
    const response = await fetch(`${apiBaseUrl}/samples?${queryStrings.join('&')}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}


async function fetchCruises({queryKey}) {
    console.log('inside fetchCruises...')
    const valid_filterKeys = ['repository', 'lake', 'platform', 'device']
    const [, filters] = queryKey
    let queryStrings = ['name_only=true']
    
    for (const [key, value] of Object.entries(filters)) {
        if (valid_filterKeys.includes(key)) {
            queryStrings.push(`${key}=${value}`)
        }
    }

    const searchParams = (queryStrings.length ? `?${queryStrings.join('&')}` : '')  
    const response = await fetch(`${apiBaseUrl}/cruises${searchParams}`)

    if (! response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}


async function fetchCruiseById({queryKey}) {
    const [_key, { cruiseId}] = queryKey
    console.log('fetching details for cruise '+cruiseId)
    const response = await fetch(`${apiBaseUrl}/cruises/${cruiseId}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}


// TODO 
async function fetchSamples({queryKey}) {
    console.log('inside fetchSamples...')
    const [, {filters}] = queryKey
    const response = await fetch(`${apiBaseUrl}/samples`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}
export {
    apiBaseUrl, 
    fetchTotalSampleCount, fetchSampleCount,
    fetchRepositoryById, fetchAllRepositories, fetchRepositories,
    fetchPlatforms, fetchDevices, fetchLakes, fetchCruises, fetchCruiseById}

