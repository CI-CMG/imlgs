
type filterParams = {
    repository: string,
    platform: string,
    lake: string,
    device: string,
    cruise: string
}
/**
 * Given a URL, return an object with default values for the filter Select widgets.
 * Note each Select default must be formatted as Option object, e.g. {"value":"WHOI","label":"Woods Hole Oceanographic Institution"}
 */
function extractDefaultFiltersFromUrl(url:URL) {
    let defaults = {}
    const searchParams = new URLSearchParams(url.search)
    if (searchParams.has('repository')) { defaults.repository = searchParams.get('repository')}
    if (searchParams.has('platform'))   { defaults.platform = searchParams.get('platform')}
    if (searchParams.has('lake'))       { defaults.lake = searchParams.get('lake')}
    if (searchParams.has('device'))     { defaults.device = searchParams.get('device')}
    if (searchParams.has('cruise'))     { defaults.cruise = searchParams.get('cruise')}
    if (searchParams.has('start_date')) { defaults.start_date = searchParams.get('start_date')}
    if (searchParams.has('min_depth'))  { defaults.min_depth = searchParams.get('min_depth')}
    if (searchParams.has('max_depth'))  { defaults.max_depth = searchParams.get('max_depth')}

    return defaults
}


function extractDefaultFiltersFromSearchParams(searchParams:URLSearchParams) {
    let defaults = {}
    const validKeys = ['repository', 'platform', 'lake', 'device', 'cruise', 'start_date', 'min_depth', 'max_depth']
    searchParams.forEach((value, key) => {
        if (validKeys.includes(key)) {
            defaults[key] = value
        }
    })
    return defaults
}


export {extractDefaultFiltersFromUrl, extractDefaultFiltersFromSearchParams}
