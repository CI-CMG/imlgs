
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
    // repository is the only filter with a label different from value and so must be retrieved from static list
    if (searchParams.has('repository')) { defaults.repository = searchParams.get('repository')}
    if (searchParams.has('platform'))   { defaults.platform = searchParams.get('platform')}
    if (searchParams.has('lake'))       { defaults.lake = searchParams.get('lake')}
    if (searchParams.has('device'))     { defaults.device = searchParams.get('device')}
    if (searchParams.has('cruise'))     { defaults.cruise = searchParams.get('cruise')}
    return defaults
}


export {extractDefaultFiltersFromUrl}
