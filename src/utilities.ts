// filter out unsupported and params with empty values
export function searchParamsToFilters(searchParams: URLSearchParams): URLSearchParams {
  const filterParams = new URLSearchParams()
  const supportedFilterNames = [
    'repository',
    'platform',
    'device',
    'cruise',
    'lake',
    'province',
    'igsn',
    'min_depth',
    'max_depth',
    'start_date_begins_with',
    'weathering',
    'metamorphism',
    'mineralogy',
    'lithology',
    'texture',
    'page',
    'imlgs',
    'order'
  ]
  // consistency in order of parameters important since it determines the output from the URLSearchParameters#toString 
  // method which is used in queryKey
  supportedFilterNames.forEach(name => {
    // value should never get null or empty string but extra statement is to keep TypeScript satisfied
    const value = (searchParams.has(name) && searchParams.get(name)) ? searchParams.get(name) : ''
    if (value) { filterParams.set(name, value)}
  })
  return filterParams
}