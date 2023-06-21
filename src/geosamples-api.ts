import { Filter, Repository, Cruise, Sample, Interval, DepthRange } from './imlgs-types';
import {QueryKey, QueryOptions, QueryFnData} from 'react-query/types/core/types';
const apiBaseUrl = import.meta.env.VITE_apiBaseUrl

// const fetchTotalSampleCount = async () => {
//     const response = await fetch(`${apiBaseUrl}/samples?count_only=true`)
//     // Fetch API doesn't consider 404 responses to be errors
//     if (! response.ok) {
//         throw new Error(response.statusText)
//     }
//     return await response.json()
// }

async function fetchTotalSampleCount(): Promise<number> {
    const response = await fetch(`${apiBaseUrl}/samples/count`)
    // Fetch API doesn't consider 404 responses to be errors
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    const data = await response.json()
    return parseInt(data.count)
}


async function fetchRepositoryById(queryData:QueryFnData): Promise<Repository> {
    const [, { repositoryId}] = queryData.queryKey
    const response = await fetch(`${apiBaseUrl}/repositories/detail/${repositoryId}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}

async function fetchRepositoryByCode(queryData:QueryFnData): Promise<Repository> {
    const [, { repositoryId}] = queryData.queryKey
    const response = await fetch(`${apiBaseUrl}/repositories/summary?repository=${repositoryId}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    const payload = await response.json()
    return payload.items[0]
}

async function fetchRepository(queryData:QueryFnData): Promise<Repository> {
    const [, { repositoryId}] = queryData.queryKey

    if (repositoryId && isNaN(parseInt(repositoryId))) {
        return fetchRepositoryByCode(queryData)
      } else {
        return fetchRepositoryById(queryData)
      }
}

// only returns name, code
async function fetchAllRepositories(): Promise<Repository[]> {
    const response = await fetch(`${apiBaseUrl}/repositories/name`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    const payload = await response.json()
    return payload.items as Repository[]
}


function createSearchParamsString(validFilterKeys:string[], filters:Filter[], defaultParams:string[] = [], ){
    // clone the incoming array
    let queryStrings = [...defaultParams]

    // console.log('filters: ', filters)
    for (const [key, value] of Object.entries(filters)) {
        // TODO replace this hack to handle blank parameter values
        let isBlank = false
        if (typeof value === 'string' && value.trim().length === 0) { isBlank = true }
        // API generally ignores invalid search params but this makes explicit what is supported in this context
        if (validFilterKeys.includes(key) && ! isBlank) {
            // temporary work around until API updated
            if (key === 'date') {
                queryStrings.push(`start_date=${value}`)
            } else {
                queryStrings.push(`${key}=${value}`)
            }
        }
    }
    // console.log('filters: ', queryStrings)
    return (queryStrings.length) ? '?'+ queryStrings.join('&'): ''
}


async function fetchRepositories(queryData:QueryFnData): Promise<Repository[]> {
    const [, filters]:[string, Filter[]] = queryData.queryKey
    const validKeys = ['platform', 'lake', 'cruise', 'device', 'date', 'bbox', 'min_depth', 'max_depth']
    const searchParamsString = createSearchParamsString(validKeys, filters)
    const response = await fetch(`${apiBaseUrl}/repositories/name${searchParamsString}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    const payload = await response.json()
    return payload.items as Repository[]
}


async function fetchPlatforms(queryData:QueryFnData): Promise<string[]> {
    const [, filters]:[string, Filter[]] = queryData.queryKey
    const validKeys = ['repository', 'lake', 'cruise', 'device', 'date', 'bbox', 'min_depth', 'max_depth']
    const searchParamsString = createSearchParamsString(validKeys, filters, ['items_per_page=2000'])
    const response = await fetch(`${apiBaseUrl}/platforms${searchParamsString}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    const payload = await response.json()
    return payload.items as string[]
}


async function fetchLakes(queryData:QueryFnData): Promise<string[]> {
    const [, filters]:[string, Filter[]] = queryData.queryKey
    const validKeys = ['repository', 'platform', 'cruise', 'device', 'date', 'bbox', 'min_depth', 'max_depth']
    const searchParamsString = createSearchParamsString(validKeys, filters, ['items_per_page=2000'])
    const response = await fetch(`${apiBaseUrl}/lakes${searchParamsString}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    const payload = await response.json()
    return payload.items as string[]
}


async function fetchDevices(queryData:QueryFnData): Promise<string[]> {
    const [, filters]:[string, Filter[]] = queryData.queryKey
    const validKeys = ['repository', 'lake', 'platform', 'cruise', 'date', 'bbox', 'min_depth', 'max_depth']
    const searchParamsString = createSearchParamsString(validKeys, filters, ['items_per_page=2000'])
    const response = await fetch(`${apiBaseUrl}/devices${searchParamsString}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    const payload = await response.json()
    return payload.items as string[]
}


async function fetchSampleCount(queryData:QueryFnData):Promise<number> {
    const [, filters]:[string, Filter[]] = queryData.queryKey
    // TODO add water depth, date
    const validKeys = ['repository', 'lake', 'platform', 'cruise', 'device', 'date', 'bbox', 'min_depth', 'max_depth']
    const searchParamsString = createSearchParamsString(validKeys, filters)
    const response = await fetch(`${apiBaseUrl}/samples/count${searchParamsString}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    const data = await response.json()
    return data.count
}


async function fetchCruises(queryData:QueryFnData): Promise<Cruise[]> {
    const [, filters]:[string, Filter[]] = queryData.queryKey
    const validKeys = ['repository', 'lake', 'platform', 'device', 'date', 'bbox', 'min_depth', 'max_depth']
    const searchParamsString = createSearchParamsString(validKeys, filters, ['items_per_page=2000'])
    const response = await fetch(`${apiBaseUrl}/cruises${searchParamsString}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    const payload = await response.json()
    return payload.items as Cruise[]}


async function fetchCruiseNames(queryData:QueryFnData): Promise<Cruise[]> {
    const [, filters]:[string, Filter[]] = queryData.queryKey
    const validKeys = ['repository', 'lake', 'platform', 'device', 'date', 'bbox', 'min_depth', 'max_depth']
    const searchParamsString = createSearchParamsString(validKeys, filters, ['items_per_page=2000'])
    const response = await fetch(`${apiBaseUrl}/cruises/name${searchParamsString}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    const payload = await response.json()
    return payload.items as Cruise[]
}


async function fetchCruiseById(queryData:QueryFnData): Promise<Cruise> {
    const [, { cruiseId}] = queryData.queryKey
    const response = await fetch(`${apiBaseUrl}/cruises/detail/${cruiseId}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}

async function lookupCruiseId({cruise, year}): Promise<number|null> {
    console.log('inside lookupCruiseId with ', cruise, year)
    const response = await fetch(`${apiBaseUrl}/cruises/detail?cruise=${cruise}&year=${year}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    const payload = await response.json()
    if (!payload.items.length) {
        return null
    }
    // theoretically possible to have duplicate cruise names w/in same year
    if (payload.items.length > 1) {
        console.warn('multiple matching cruises. returning only the first id')
    }
    return payload.items[0].id
}


async function lookupRepositoryId({repositoryCode}): Promise<number|null> {
    const response = await fetch(`${apiBaseUrl}/repositories/summary?repository=${repositoryCode}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    const payload = await response.json()
    if (!payload.items.length) {
        return null
    }
    return payload.items[0].id
}

async function fetchSamples(queryData:QueryFnData) {
    const [, filters]:[string, Filter[]] = queryData.queryKey
    // URL query params allowed for Samples
    const validKeys = [
        'repository',
        'lake',
        'platform',
        'device',
        'cruise',
        'date',
        'bbox',
        'min_depth',
        'max_depth',
        'page',
        'items_per_page',
        'cruise_id',
        'facility_id'
    ]
    const searchParamsString = createSearchParamsString(validKeys, filters)
    // console.log(searchParamsString)
    const response = await fetch(`${apiBaseUrl}/samples/summary${searchParamsString}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
    // const payload = await response.json()
    // return payload.items as Sample[]
}

async function fetchSampleById(queryData:QueryFnData): Promise<Sample> {
    const [, { sampleId}] = queryData.queryKey
    const response = await fetch(`${apiBaseUrl}/samples/detail/${sampleId}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    const sample = await response.json()
/*
    // augment Sample with cruiseId and repositoryId.
    const year = sample.begin_date ? sample.begin_date.substr(0,4) : null
    // TODO use cruise, year, and platform to uniquely identify cruise?
    sample.cruiseId = await lookupCruiseId({cruise: sample.cruise, year: year})
    sample.repositoryId = await lookupRepositoryId({repositoryCode: sample.facility_code})
*/
    return sample
}


async function fetchIntervalsBySampleId(queryData:QueryFnData): Promise<Interval[]> {
    const [, { sampleId}] = queryData.queryKey
    const response = await fetch(`${apiBaseUrl}/intervals/detail?imlgs=${sampleId}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}


async function fetchIntervalById(queryData:QueryFnData): Promise<Interval[]> {
    const [, {id}] = queryData.queryKey
    const response = await fetch(`${apiBaseUrl}/intervals/detail/${id}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}


async function fetchDepthRange(queryData:QueryFnData): Promise<DepthRange> {
    const [, filters]:[string, Filter[]] = queryData.queryKey
    const validKeys = ['repository', 'lake', 'platform', 'device', 'cruise', 'date', 'bbox', 'min_depth', 'max_depth', 'offset', 'page_size']
    const searchParamsString = createSearchParamsString(validKeys, filters)
    const response = await fetch(`${apiBaseUrl}/depth_range${searchParamsString}`)
    if (! response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}


export {
    apiBaseUrl, fetchTotalSampleCount, fetchSampleCount, fetchRepositoryById, 
    fetchAllRepositories, fetchIntervalsBySampleId, fetchSampleById, fetchSamples, 
    fetchDepthRange, fetchRepositories, fetchPlatforms, fetchDevices, fetchLakes, 
    fetchCruises, fetchCruiseNames, fetchCruiseById, lookupCruiseId, fetchRepository,
    fetchIntervalById
}

