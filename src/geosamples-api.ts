
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
        // API generally ignores invalid search params but this makes explicit what is supported in this context
        if (validFilterKeys.includes(key)) {
            queryStrings.push(`${key}=${value}`)
        }
    }
    return (queryStrings.length) ? '?'+ queryStrings.join('&'): ''
}


async function fetchRepositories({queryKey}) {
    const [, filters] = queryKey
    const validKeys = ['platform', 'lake', 'cruise', 'device']
    const searchParamsString = createSearchParamsString(['name_only=true'], validKeys, filters)
    const response = await fetch(`${apiBaseUrl}/repositories${searchParamsString}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}


async function fetchPlatforms({queryKey}) {
    const [, filters] = queryKey
    const validKeys = ['repository', 'lake', 'cruise', 'device']
    // no "name_only" option for platforms
    const searchParamsString = createSearchParamsString([], validKeys, filters)
    const response = await fetch(`${apiBaseUrl}/platforms${searchParamsString}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}


async function fetchLakes({queryKey}) {
    const [, filters] = queryKey
    const validKeys = ['repository', 'platform', 'cruise', 'device']

    // no "name_only" option for lakes
    const searchParamsString = createSearchParamsString([], validKeys, filters)
    const response = await fetch(`${apiBaseUrl}/lakes${searchParamsString}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}


async function fetchDevices({queryKey}) {
    const [, filters] = queryKey
    const validKeys = ['repository', 'lake', 'platform', 'cruise']

    // no "name_only" option for lakes
    const searchParamsString = createSearchParamsString([], validKeys, filters)
    const response = await fetch(`${apiBaseUrl}/devices${searchParamsString}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}


async function fetchSampleCount({queryKey}) {
    const [, filters] = queryKey
    // TODO add water depth, date
    const validKeys = ['repository', 'lake', 'platform', 'cruise', 'device']
    const searchParamsString = createSearchParamsString(['count_only=true'], validKeys, filters)
    const response = await fetch(`${apiBaseUrl}/samples${searchParamsString}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}


async function fetchCruises({queryKey}) {
    const [, filters] = queryKey
    const validKeys = ['repository', 'lake', 'platform', 'device']
    const searchParamsString = createSearchParamsString([], validKeys, filters)
    const response = await fetch(`${apiBaseUrl}/cruises${searchParamsString}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}


async function fetchCruiseById({queryKey}) {
    const [_key, { cruiseId}] = queryKey
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

