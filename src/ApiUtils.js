
const apiBaseUrl = 'http://localhost/geosamples-api'


function buildQueryUrl(resourcePath, filters = []) {
    // console.log(`inside buildQueryUrl with: ${resourcePath}`)
    // filters.forEach((item) => {
    //     console.log(`${item.name}=${item.value}`)
    // })

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