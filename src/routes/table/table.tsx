import './table.css'
import { useLoaderData, useSearchParams, Link } from "react-router-dom"
import { Sample, loader as samplesLoader } from './data'
import { getRepositoryNameByCode as getRepository } from '../repositories/data'
import { searchParamsToFilters } from '../../utilities'
const apiBaseUrl = import.meta.env.VITE_apiBaseUrl


export default function SamplesTable() {
  const baseClass = 'SamplesTable'
  // const queryClient = useQueryClient()
  // console.log(queryClient.getDefaultOptions())
  const [searchParams, setSearchParams] = useSearchParams()

  const loaderData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof samplesLoader>>>
  // console.log({loaderData})

  const currentPage = loaderData.page
  const samples = loaderData.items
  const totalItems = loaderData.total_items
  const totalPages = loaderData.total_pages
  const itemsPerPage = loaderData.items_per_page


  async function formatRepositoryLink(item: Sample) {
    const repository = await getRepository(item.facility_code)

    return (
    <Link to={{pathname:`/repositories/${repository.id}`}}>{repository.facility_code}</Link>
    )
  }


  function exportCSV() {
    // strip out any search params not allowable for filtering
    const filters = searchParamsToFilters(searchParams)
    const queryURL = `${apiBaseUrl}/samples/csv?${filters.toString()}`
    console.log('exporting samples using URL ', queryURL)
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
    const newSearchParams = new URLSearchParams(searchParams)
    if (event.target.selectedIndex === 0) {
      // use default sort order as determined by the API
      newSearchParams.delete('order')
    } else {
      newSearchParams.set('order', event.target.value)
    }
    setSearchParams(newSearchParams)
  }


  return(
    <div>
      <nav>
        <div style={{paddingTop:'5px', paddingBottom:'5px'}}>
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
          <select style={{marginLeft: '100px'}} onChange={sortHandler}>
            <option>-- Sort By --</option>
            <option>Repository</option>
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

      <main className={baseClass} style={{ padding: "1rem 0" }}>
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
            samples.map(item => (
              <tr key={item.imlgs}>
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
      </main>
        
  </div>
  )
}

