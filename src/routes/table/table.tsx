import './table.css'
import { useEffect } from 'react'
import { useLoaderData, useSearchParams, Link } from "react-router-dom"
import { loader as samplesLoader } from './data'
import { searchParamsToFilters } from '../../utilities'
const apiBaseUrl = import.meta.env.VITE_apiBaseUrl

const validSortItems = [
  'facility_code',
  'platform',
  'cruise',
  'imlgs',
  'device',
  'water_depth',
  // 'start_date_begins_with',
  'igsn'
]

export default function SamplesTable() {
  const baseClass = 'SamplesTable'
  const [searchParams, setSearchParams] = useSearchParams()
  
  const loaderData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof samplesLoader>>>

  const currentPage = loaderData.page
  const samples = loaderData.items
  const totalItems = loaderData.total_items
  const totalPages = loaderData.total_pages
  
  useEffect(() => {
    // 'order' may have multiple values and order of terms matters. 
    // use the first sort param to set select option
    // TS does not recognize the type guard in the ternary conditional
    const sortParam = (searchParams.get('order') ? searchParams.get('order')?.split(':')[0] as string : 'facility_code')
    if (! validSortItems.includes(sortParam)) { return }
    const selectElement = document.getElementById('sortItemSelect') as HTMLInputElement
    selectElement.value = sortParam

    const pageInput = document.getElementById('goToPageInput') as HTMLInputElement
    if (pageInput) {
      pageInput.value = searchParams.has('page') ? searchParams.get('page') as string: '1'
    }
  }, [searchParams])

  useEffect(() => {
    if (searchParams.get('order')) { return }
    console.log('no sort order specified, setting to facility_code, platform, cruise, sample')
    const newSearchParams = new URLSearchParams(searchParams)
    // TODO why does TS require semicolon to terminate the following statement?
    newSearchParams.set('order', 'facility_code:asc');
    ['platform', 'cruise', 'sample'].forEach( i => newSearchParams.append('order', `${i}:asc`))
    setSearchParams(newSearchParams)
  }, [searchParams])


  function checkForEnterKey(event:React.KeyboardEvent<HTMLInputElement>):void {
    if (event.key === 'Enter') {
      const target = event.target as HTMLInputElement
      target.blur()
    }
  }

  function onBlurHandler(event:React.FocusEvent<HTMLInputElement>):void {
    event.target.blur()
    // no need to submit form if input didn't change
    if (!event.target.value && !searchParams.get(event.target.name)) { return }
    if (event.target.value === searchParams.get(event.target.name)) { return }
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('page', event.target.value)
    setSearchParams(newSearchParams)
  }


  function exportCSV() {
    // strip out any search params not allowable for filtering
    const filters = searchParamsToFilters(searchParams)
    const queryURL = `${apiBaseUrl}/samples/csv?${filters.toString()}`
    window.open(queryURL)
  }

  function firstPage() {
    if (currentPage === 1) { return }
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('page', '1')
    // triggers page reload
    setSearchParams(newSearchParams)
  }

  function lastPage() {
    if (currentPage === totalPages) { return }
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('page', totalPages.toString())
    // triggers page reload
    setSearchParams(newSearchParams)
  }

  function previousPage() {
    if (currentPage === 1) { return }
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('page', (currentPage - 1).toString())
    // triggers page reload
    setSearchParams(newSearchParams)
  }


  function nextPage() {
    if (currentPage === totalPages) { return }
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('page', (currentPage + 1).toString())
    setSearchParams(newSearchParams)
  }


  function sortHandler(event: React.ChangeEvent<HTMLSelectElement>) {
    const sortOrder = 'asc'
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('order', `${event.target.value}:${sortOrder}`)
    // facility_code (default) has multiple sort items
    if (event.target.value === 'facility_code') {
      ['platform', 'cruise', 'sample'].forEach( i => newSearchParams.append('order', `${i}:${sortOrder}`))
    }
    setSearchParams(newSearchParams)
  }


  return(
    <div className='SamplesTable--container'>
      <nav className='SamplesTable--navbar'>
        <div>
            <button type="button" className={`${baseClass}--button`} style={{marginLeft: '15px', marginRight:'50px'}} 
              onClick={exportCSV} title='export table contents to CSV file'
            >Export Data</button>
            <button type="button" className={`${baseClass}--button`} style={{marginRight:'5px'}} onClick={firstPage} 
              disabled={currentPage === 1} title='go to the first page of data'>
              &lt;&lt;
            </button>
            <button type="button" className={`${baseClass}--button`} style={{marginRight:'5px'}} onClick={previousPage} 
              disabled={currentPage === 1} title='go to the previous page of data'>
              &lt;
            </button>
            <button type="button" className={`${baseClass}--button`} style={{marginRight:'5px'}} onClick={nextPage} 
              disabled={currentPage === totalPages} title='go to the next page of data'>
              &gt;
            </button>
            <button type="button" className={`${baseClass}--button`} style={{marginRight:'35px'}} onClick={lastPage} 
              disabled={currentPage === totalPages} title='go to the last page of data'>
              &gt;&gt;
            </button>
            <span style={{fontSize:"18px"}}>page</span>
            <input 
              type="text" 
              name="page"
              id="goToPageInput"
              size={3} 
              style={{marginRight:'10px', marginLeft:'10px', fontSize:"18px", textAlign:"center"}} 
              defaultValue={ searchParams.has('page') ? searchParams.get('page') as string : 1 }
              onBlur={onBlurHandler}
              onKeyDown={event => checkForEnterKey(event) }
              title="specify page number to display"
              aria-label='specify page number to display'
            />
            <span style={{fontSize:"18px"}}> of {totalPages} ({totalItems} total records)</span>
          <select id="sortItemSelect" style={{fontSize: 'large', marginLeft: '100px'}} onChange={sortHandler}
              title="choose attribute on which to sort table"
              aria-label='choose attribute on which to sort table'          
          >
            {/* <option>-- Sort By --</option> */}
            <option value='facility_code'>Repository</option>
            <option value='platform'>Ship/Platform</option>
            <option value='cruise'>Cruise</option>
            <option value='imlgs'>IMLGS</option>
            <option value='device'>Device</option>
            <option value='water_depth'>Water Depth (m)</option>
            {/* <option value='start_date_begins_with'>Collection Date</option> */}
            <option value='igsn'>IGSN</option>
            <option value='sample'>Sample ID</option>
            <option value='lat'>Latitude</option>
            <option value='lon'>Longitude</option>
          </select> 
        </div>
      </nav>

      <div className={baseClass} style={{ padding: "1rem 0" }}>
        {(samples && samples.length === 0) ? <h4>no data</h4>: ''}
        {samples.length ? 
          <>
          <table className={`${baseClass}--datatable`} aria-describedby='table-summary'>
            <caption>IMLGS Samples</caption>
          <thead>
            <tr>
                <th>Repository<br/>Link</th>
                <th>Ship/<br/>Platform</th>
                <th>Cruise</th>
                <th>Sample/Hole<br/>Data Link</th>
                <th>Device</th>
                <th>Core Length<br/>(cm)</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Water Depth<br/>(m)</th>
                <th>Collection<br/>Date</th>
                <th>IGSN</th>
                <th>IMLGS</th>
            </tr>
          </thead>
          <tbody>{
            loaderData.items.map(item => (
              <tr key={item.imlgs}>
                {/* TODO why is item.facility undefined? */}
              <td>{item.facility ? 
                <Link to={{pathname:`/repositories/${item.facility.id}`}}>{item.facility.facility_code}</Link> 
              : 
                item.facility_code
              }
              </td>
              <td>{item.platform}</td>
              <td>{item.cruise}</td>
              <td><Link to={{pathname:`/samples/${item.imlgs}`}}>{item.sample}</Link></td>
              <td>{item.device}</td>
              <td>{item.cored_length}</td>
              <td>{item.lat}</td>
              <td>{item.lon}</td>
              <td>{item.water_depth}</td>
              <td>{item.begin_date}</td>
              <td>{item.igsn}</td>
              <td><Link to={{pathname:`/samples/${item.imlgs}`}}>{item.imlgs}</Link></td>
              </tr>
            )) 
            }
            </tbody>
            </table>
            <div id='table-summary' className="sr-only">This table contains a list of IMLGS samples with selected attributes including 
              Repository, Ship/Platform, Sample ID, Device, Location, Depth, and Date</div>
            </>
            : ''
        }
      </div>      
  </div>
  )
}

