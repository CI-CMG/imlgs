
const apiBaseUrl = 'https://www.ngdc.noaa.gov/geosamples-api'

const fetchTotalSampleCount = async () => {
    // console.log('fetching total number of samples...')
    const response = await fetch(`${apiBaseUrl}/samples?count_only=true`)
    // Fetch API doesn't consider 404 responses to be errors
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}

type Params = {
    queryKey: [string, { id: number }];
};

async function fetchRepositoryById({queryKey}) {
    const [_key, { repositoryId}] = queryKey
    console.log('fetching details for repository '+repositoryId)
    const response = await fetch(`${apiBaseUrl}/repositories/${repositoryId}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}


async function fetchAllRepositories() {
    console.log('inside fetchAllRepositories...')

    const response = await fetch(`${apiBaseUrl}/repositories?name_only=true`)

    if (! response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}

async function fetchFilteredRepositories({queryKey}) {
    console.log('inside fetchFilteredRepositories...')
    // API ignores invalid search params but this makes explicit what is supported in this context
    const valid_filterKeys = ['platform']

    const [, filters] = queryKey
    let queryStrings = ['name_only=true']
    console.log(filters)
    for (const [key, value] of Object.entries(filters)) {
        if (valid_filterKeys.includes(key)) {
            queryStrings.push(`${key}=${value}`)
        }
    }
    console.log('filter repositories by ', queryStrings.join('&'))
    const response = await fetch(`${apiBaseUrl}/repositories?${queryStrings.join('&')}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}


async function fetchFilteredPlatforms({queryKey}) {
    console.log('inside fetchFilteredPlatforms...')
    // API ignores invalid search params but this makes explicit what is supported in this context
    const valid_filterKeys = ['repository']

    const [, filters] = queryKey
    let queryStrings = ['name_only=true']
    
    for (const [key, value] of Object.entries(filters)) {
        if (valid_filterKeys.includes(key)) {
            queryStrings.push(`${key}=${value}`)
        }
    }
    console.log('filter platforms by ', queryStrings.join('&'))
    const response = await fetch(`${apiBaseUrl}/platforms?${queryStrings.join('&')}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}

async function fetchFilteredSampleCount({queryKey}) {
    console.log('inside fetchFilteredSampleCount...')
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
    const [, filters] = queryKey

    // accepts optional search parameters of repository and platform
    let queryStrings = ['name_only=true']
    // let queryStrings = []
    for (const [key, value] of Object.entries(filters)) {
        queryStrings.push(`${key}=${value}`)
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
    fetchTotalSampleCount, fetchFilteredSampleCount,
    fetchRepositoryById, fetchAllRepositories, fetchFilteredRepositories,
    fetchFilteredPlatforms,
    fetchCruises, fetchCruiseById}

