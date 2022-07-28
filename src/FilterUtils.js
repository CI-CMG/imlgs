/*
module of various utility functions for manipulating the Sample filters,
e.g. repository, lake, platform, etc.
 */

// WARNING: this list must be kept in sync w/ API response from
// https://www.ngdc.noaa.gov/geosamples-api/repositories?name_only=true
// TODO: load data dynamically but must be available by the time
//  SamplesControlPanel, MapPanel are constructed. Perhaps a DataLoader on /samples route?
const allRespositories = [
    {"facility_code":"ACC","facility":"Antarctic Core Collection, Oregon State University"},
    {"facility_code":"AOML","facility":"NOAA-Atlantic Oceanographic and Meteorol. Lab"},
    {"facility_code":"AWI","facility":"Alfred Wegener Institut"},
    {"facility_code":"BOSCORF","facility":"British Ocean Sediment Core Research Facility"},
    {"facility_code":"BPCRC","facility":"BPCRC Sediment Core Repository"},
    {"facility_code":"BPCRR","facility":"Polar Rock Repository, BPCRC"},
    {"facility_code":"Canada","facility":"Geological Survey of Canada (GSC)"},
    {"facility_code":"DSDP","facility":"Deep Sea Drilling Project"},
    {"facility_code":"ECS","facility":"US Extended Continental Shelf Samples Repository"},
    {"facility_code":"France","facility":"Universite de Savoie, EDYTEM"},
    {"facility_code":"GEOMAR","facility":"GEOMAR Helmholtz Centre for Ocean Research Kiel"},
    {"facility_code":"IODP","facility":"International Ocean Discovery Program"},
    {"facility_code":"LDEO","facility":"Lamont-Doherty Earth Observatory"},
    {"facility_code":"LacCore","facility":"National Lacustrine Core Repository"},
    {"facility_code":"NMNH","facility":"National Museum of Natural History"},
    {"facility_code":"ODP","facility":"Ocean Drilling Program"},
    {"facility_code":"OER","facility":"NOAA Office of Ocean Exploration and Research"},
    {"facility_code":"OSU","facility":"Oregon State Univ Marine and Geology Repository"},
    {"facility_code":"PMEL","facility":"NOAA-Pacific Marine Environmental Labs"},
    {"facility_code":"RSMAS","facility":"Rosenstiel School of Marine & Atmos. Sciences"},
    {"facility_code":"SIO","facility":"Scripps Institution of Oceanography"},
    {"facility_code":"SOEST","facility":"University of Hawaii at Manoa"},
    {"facility_code":"U WISC","facility":"University of Wisconsin-Madison"},
    {"facility_code":"URI","facility":"University of Rhode Island"},
    {"facility_code":"USC","facility":"University of Southern California"},
    {"facility_code":"USGSMP","facility":"Pacific Coastal and Marine Science Center"},
    {"facility_code":"USGSSP","facility":"St. Petersburg Coastal and Marine Science Center"},
    {"facility_code":"USGSWH","facility":"Woods Hole Coastal and Marine Science Center"},
    {"facility_code":"UT","facility":"Univ of Texas Marine Science Institute"},
    {"facility_code":"WHOI","facility":"Woods Hole Oceanographic Institution"}
]

export function lookupRepositoryByCode(code) {
    return(allRespositories.map(item => {return({value: item.facility_code, label:item.facility})})
        .find((item) => item.value === code))
}


/**
 * Given a URL, return an object with default values for the filter Select widgets.
 * Note each Select default must be formatted as Option object, e.g. {"value":"WHOI","label":"Woods Hole Oceanographic Institution"}
 */
export function extractDefaultFiltersFromUrl(url) {
    let defaults = {}
    const searchParams = new URLSearchParams(url.search)
    // repository is the only filter with a label different from value and so must be retrieved from static list
    if (searchParams.has('repository')) { defaults.repository = lookupRepositoryByCode(searchParams.get('repository')) }
    if (searchParams.has('platform')) { defaults.platform = { value: searchParams.get('platform')} }
    if (searchParams.has('lake')) { defaults.lake = {value: searchParams.get('lake')} }
    if (searchParams.has('device')) { defaults.device = {value: searchParams.get('device')} }
    if (searchParams.has('cruise')) { defaults.cruise = {value: searchParams.get('cruise')} }
    return defaults
}


/**
 * constructs a SQL-like expression for displaying subsets of the data in the mapservice.
 * WARNING: tight coupling with ArcGIS mapservice layer:
 *   https://gis.ngdc.noaa.gov/arcgis/rest/services/Sample_Index/MapServer/0
 *
 * expects an Object with key representing filter name and value being Object in format
 *   {"value":"WHOI","label":"Woods Hole Oceanographic Institution"}
 */
export function buildLayerDefinitionExpression(filters) {
    let defs = []

    for (const [key, value] of Object.entries(filters)) {
        // handle both simple and embedded formats e.g. {'repository': 'AOML'} and {'repository': {value:'AOML', label: 'NOAA-Atlantic Oceanographic and Meteorol. Lab'}}
        const filter = getFilterValue(value)
        if (key === 'repository') { defs.push(`FACILITY_CODE = '${filter}'`) }
        if (key === 'platform') {defs.push(`PLATFORM = '${filter}'`) }
        if (key === 'lake') { defs.push(`LAKE = '${filter}'`) }
        if (key === 'device') { defs.push(`DEVICE = '${filter}'`) }
        if (key === 'cruise') { defs.push(`CRUISE = '${filter}'`) }
        if (key === 'startDate') { defs.push(`BEGIN_DATE like '${filter}%'`) }
        // minDepth may be 0 and therefore falsey. maxDepth should not be 0
        if (key === 'minDepth' && value != null) { defs.push(`WATER_DEPTH >= ${filter}`) }
        if (key === 'maxDepth') { defs.push(`WATER_DEPTH <= ${filter}`) }
    }

    if (defs.length) {
        return(defs.join(' and '))
    } else {
        return('')
        // return undefined
    }
}


function getFilterValue(val) {
    if (typeof(val) === 'object') {
        return val.value
    } else {
        return(val)
    }
}

export function buildTableUrl(url, filters) {
    let searchParams = new URLSearchParams()
    for (const [key, value] of Object.entries(filters)) {
        searchParams.set(key, String(value))
    }

    const paramsString = searchParams.toString()
    return (url + (paramsString ? '?' + paramsString: ''))
}


export function buildSampleCountUrl(baseUrl, filters) {
    const url = `${baseUrl}/samples`
    let searchParams = new URLSearchParams()
    searchParams.set('count_only', String(true))
    for (const [key, value] of Object.entries(filters)) {
        searchParams.set(key, String(value))
    }
    const paramsString = searchParams.toString()
    return(url + (paramsString? '?' + paramsString: ''))
}