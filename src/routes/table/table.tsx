import './table.css'
import { useState, useEffect } from 'react'
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
  'start_date',
  'igsn'
]

export default function SamplesTable() {
  // console.log('re-rendering SamplesTable...')
  const baseClass = 'SamplesTable'
  // const queryClient = useQueryClient()
  // console.log(queryClient.getDefaultOptions())
  const [searchParams, setSearchParams] = useSearchParams()
  const [pageNumber, setPageNumber] = useState(1)

  const loaderData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof samplesLoader>>>

  const currentPage = loaderData.page
  const samples = loaderData.items
  const totalItems = loaderData.total_items
  const totalPages = loaderData.total_pages

  useEffect(() => {
    // 'order' may have multiple values and order of terms matters. 
    // use the first sort param to set select option
    // TODO why is string type assertion necessary for TS?
    const sortParam = (searchParams.get('order') ? searchParams.get('order')?.split(':')[0] as string : 'facility_code')
    if (! validSortItems.includes(sortParam)) { return }
    const selectElement = document.getElementById('sortItemSelect') as HTMLInputElement
    selectElement.value = sortParam
  }, [searchParams])

  function incrementPage() {
    setPageNumber((pageNumber) => pageNumber + 1)
  }

  function decrementPage() {
    setPageNumber((pageNumber) => pageNumber - 1)
  }

  function exportCSV() {
    // strip out any search params not allowable for filtering
    const filters = searchParamsToFilters(searchParams)
    const queryURL = `${apiBaseUrl}/samples/csv?${filters.toString()}`
    window.open(queryURL)
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
      newSearchParams.append('order', 'platform')
      newSearchParams.append('order', 'cruise')
      newSearchParams.append('order', 'sample')
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
          <button type="button" className={`${baseClass}--button`} style={{marginRight:'5px'}} onClick={previousPage} 
            disabled={currentPage === 1} title='go to the previous page of data'>
            &lt;
          </button>
          <button type="button" className={`${baseClass}--button`} style={{}} onClick={nextPage} 
            disabled={currentPage === totalPages} title='go to the next page of data'>
            &gt;
          </button>
          <span style={{marginLeft: '15px'}}>page {currentPage} of {totalPages} ({totalItems} total records)</span>
          <select id="sortItemSelect" style={{fontSize: 'large', marginLeft: '100px'}} onChange={sortHandler}>
            {/* <option>-- Sort By --</option> */}
            <option value='facility_code'>Repository</option>
            <option value='platform'>Ship/Platform</option>
            <option value='cruise'>Cruise</option>
            <option value='imlgs'>IMLGS</option>
            <option value='device'>Device</option>
            <option value='water_depth'>Water Depth (m)</option>
            <option value='start_date'>Collection Date</option>
            <option value='igsn'>IGSN</option>
          </select>
        </div>
      </nav>

      <div className={baseClass} style={{ padding: "1rem 0" }}>
        {(samples && samples.length === 0) ? <h4>no data</h4>: ''}
        {samples.length ? 
          <table className={`${baseClass}--datatable`}>
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
            : ''
        }
      </div>
      
        {/* <button type='button' onClick={incrementPage}>increment page</button> */}
  </div>
  )
}

