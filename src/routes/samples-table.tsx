import React, {useState, useEffect} from 'react'
import { Filter, Repository, Cruise, Sample, Interval, DepthRange } from '../imlgs-types'
import {
  useQuery,
  useQueries,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from 'react-query'
import { useSearchParams, Link } from "react-router-dom";
import { apiBaseUrl, fetchSamples, fetchSampleCount } from '../geosamples-api'
import { extractDefaultFiltersFromSearchParams } from '../geosamples-utils'
import Button from '@mui/material/Button';
import './samples-table.css'

type QueryParams = {
  page?: number
  items_per_page?: number
}

export default function SamplesTable() {
  // console.log('redrawing SamplesTable...')
  const baseClass = 'SamplesTable'
  let [searchParams, setSearchParams] = useSearchParams();
  const filterDefaults = extractDefaultFiltersFromSearchParams(searchParams)

  // NOT the value contained in the last API response but the one used in the next request
  const [page, setPage] = useState(1)

  function buildQueryParams() {
    const params: QueryParams = Object.assign({}, filterDefaults)
    params.page = page
    return params
  }

  const queryParams = buildQueryParams()
  const { data, error, status } = useQuery(["samples", queryParams], fetchSamples)
  let totalItems, totalPages, itemsPerPage, currentPage, samples
  if (data) {
    currentPage = data.page
    totalItems = data.total_items
    totalPages = data.total_pages
    itemsPerPage = data.items_per_page
    samples = data.items
    console.log(samples[0])
  }

  // normally shouldn't have page passed in table URL
  if (searchParams.has('page')) { setPage(parseInt(searchParams.get('page') as string)) }


  function nextPage() {
    setPage((page) => page + 1)
  }

  function previousPage() {
    setPage((page) => (page <= 1)? 1 : page - 1)
  }

  function exportCSV() {
      searchParams.set('format', 'csv')
      const queryURL = `${apiBaseUrl}/samples/csv?${searchParams.toString()}`
      window.open(queryURL)
  }

  return (
    <>
      <nav>
        <div style={{paddingTop:'5px', paddingBottom:'5px'}}>
        <Button className={`${baseClass}--exportBtn`} style={{marginLeft: '15px', marginRight:'50px'}} variant="contained" onClick={exportCSV}>Export Data</Button>
        <Button className={`${baseClass}--prevPageBtn`} style={{marginRight:'5px'}} 
            variant="contained" onClick={previousPage} 
            disabled={page === 1}>&lt;</Button>
        <Button className={`${baseClass}--nextPageBtn`} style={{}} 
            variant="contained" onClick={nextPage} 
            disabled={page === totalPages}>&gt;</Button>
          {/* <span style={{marginLeft: '15px'}}>samples {offset} to {(samples.length<pageSize)? offset+samples.length: offset+pageSize} (out of {sampleCount})</span> */}
          <span style={{marginLeft: '15px'}}>page {currentPage} of {totalPages} ({totalItems} total records)</span>
        </div>
      </nav>
      <main className={baseClass} style={{ padding: "1rem 0" }}>
        {(!samples) ? <h4>loading data...</h4>: ''}
        {(samples && samples.length === 0) ? <h4>no data</h4>: ''}
        {samples?.length ? 
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
              <td><Link to={{pathname:`/repositories/${item.facility_code}`}}>{item.facility_code}</Link></td>
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
      </>
    );
  }
