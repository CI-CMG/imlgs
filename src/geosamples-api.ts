import { Filter, Repository, Cruise, Sample } from './imlgs-types';
import {QueryKey, QueryOptions, QueryFnData} from 'react-query/types/core/types';

const apiBaseUrl = 'https://www.ngdc.noaa.gov/geosamples-api'


// const fetchTotalSampleCount = async () => {
//     const response = await fetch(`${apiBaseUrl}/samples?count_only=true`)
//     // Fetch API doesn't consider 404 responses to be errors
//     if (! response.ok) {
//         throw new Error(response.statusText)
//     }
//     return await response.json()
// }

async function fetchTotalSampleCount(): Promise<number> {
    const response = await fetch(`${apiBaseUrl}/samples?count_only=true`)
    // Fetch API doesn't consider 404 responses to be errors
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    const data = await response.json()
    return parseInt(data.count)
}


async function fetchRepositoryById(queryData:QueryFnData): Promise<Repository> {
    const [, { repositoryId}] = queryData.queryKey
    const response = await fetch(`${apiBaseUrl}/repositories/${repositoryId}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}

// only returns name, code
async function fetchAllRepositories(): Promise<Repository[]> {
    const response = await fetch(`${apiBaseUrl}/repositories?name_only=true`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}


function createSearchParamsString(validFilterKeys:string[], filters:Filter[], defaultParams:string[] = [], ){
    // clone the incoming array
    let queryStrings = [...defaultParams]

    for (const [key, value] of Object.entries(filters)) {
        // API generally ignores invalid search params but this makes explicit what is supported in this context
        if (validFilterKeys.includes(key)) {
            queryStrings.push(`${key}=${value}`)
        }
    }
    return (queryStrings.length) ? '?'+ queryStrings.join('&'): ''
}


async function fetchRepositories(queryData:QueryFnData): Promise<Repository[]> {
    const [, filters]:[string, Filter[]] = queryData.queryKey
    const validKeys = ['platform', 'lake', 'cruise', 'device']
    const searchParamsString = createSearchParamsString(validKeys, filters, ['name_only=true'])
    const response = await fetch(`${apiBaseUrl}/repositories${searchParamsString}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}


async function fetchPlatforms(queryData:QueryFnData): Promise<string[]> {
    const [, filters]:[string, Filter[]] = queryData.queryKey
    const validKeys = ['repository', 'lake', 'cruise', 'device']
    // no "name_only" option for platforms
    const searchParamsString = createSearchParamsString(validKeys, filters)
    const response = await fetch(`${apiBaseUrl}/platforms${searchParamsString}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}


async function fetchLakes(queryData:QueryFnData): Promise<string[]> {
    const [, filters]:[string, Filter[]] = queryData.queryKey
    const validKeys = ['repository', 'platform', 'cruise', 'device']

    // no "name_only" option for lakes
    const searchParamsString = createSearchParamsString(validKeys, filters)
    const response = await fetch(`${apiBaseUrl}/lakes${searchParamsString}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}


async function fetchDevices(queryData:QueryFnData): Promise<string[]> {
    const [, filters]:[string, Filter[]] = queryData.queryKey
    const validKeys = ['repository', 'lake', 'platform', 'cruise']

    // no "name_only" option for lakes
    const searchParamsString = createSearchParamsString(validKeys, filters)
    const response = await fetch(`${apiBaseUrl}/devices${searchParamsString}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}


async function fetchSampleCount(queryData:QueryFnData):Promise<number> {
    const [, filters]:[string, Filter[]] = queryData.queryKey
    // TODO add water depth, date
    const validKeys = ['repository', 'lake', 'platform', 'cruise', 'device', 'start_date']
    const searchParamsString = createSearchParamsString(validKeys, filters, ['count_only=true'])
    console.log()
    const response = await fetch(`${apiBaseUrl}/samples${searchParamsString}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    const data = await response.json()
    return data.count
}


async function fetchCruises(queryData:QueryFnData): Promise<Cruise[]> {
    const [, filters]:[string, Filter[]] = queryData.queryKey
    const validKeys = ['repository', 'lake', 'platform', 'device']
    const searchParamsString = createSearchParamsString(validKeys, filters)
    const response = await fetch(`${apiBaseUrl}/cruises${searchParamsString}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}


async function fetchCruiseNames(queryData:QueryFnData): Promise<string[]> {
    const [, filters]:[string, Filter[]] = queryData.queryKey
    const validKeys = ['repository', 'lake', 'platform', 'device']
    const searchParamsString = createSearchParamsString(validKeys, filters, ['name_only=true'])
    const response = await fetch(`${apiBaseUrl}/cruises${searchParamsString}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}


async function fetchCruiseById(queryData:QueryFnData): Promise<Cruise> {
    const [, { cruiseId}] = queryData.queryKey
    const response = await fetch(`${apiBaseUrl}/cruises/${cruiseId}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}


async function fetchSamples(queryData:QueryFnData): Promise<Sample[]> {
    const [, filters]:[string, Filter[]] = queryData.queryKey
    const validKeys = ['repository', 'lake', 'platform', 'device', 'cruise']
    const searchParamsString = createSearchParamsString(validKeys, filters, )
    const response = await fetch(`${apiBaseUrl}/samples${searchParamsString}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}

export {
    apiBaseUrl, fetchTotalSampleCount, fetchSampleCount, fetchRepositoryById, fetchAllRepositories, 
    fetchRepositories, fetchPlatforms, fetchDevices, fetchLakes, fetchCruises, fetchCruiseNames, fetchCruiseById
}

