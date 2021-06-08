
const apiBaseUrl = 'http://localhost:8080/geosamples-api'


function buildQueryUrl(resourcePath, filters = []) {
    const url = `${apiBaseUrl}/${resourcePath}`
    // short circuit if no filters
    if (! filters) { return url }

    let queryStrings = []
    filters.forEach((item) => {
        queryStrings.push(`${item.name}=${item.value}`)
    })
    return `${url}?${queryStrings.join('&')}`
}


export {apiBaseUrl, buildQueryUrl}