import React, {useState} from 'react'
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

export default function SamplesTable() {
  console.log('redrawing SamplesTable...')
  const baseClass = 'SamplesTable'
  let [searchParams, setSearchParams] = useSearchParams();
  const filterDefaults = extractDefaultFiltersFromSearchParams(searchParams)

  const [offset, setOffset] = useState(0)
  const [pageSize, setPageSize] = useState(500)
  // normally shouldn't have offset and page_size passed in table URL
  if (searchParams.has('offset')) { setOffset(searchParams.get('offset')) }
  if (searchParams.has('page_size')) { setPageSize(searchParams.get('page_size')) }


  const sampleCountQuery = useQuery(["sampleCount", filterDefaults], fetchSampleCount);
  const samplesParams = Object.assign({}, filterDefaults)
  samplesParams.offset = offset
  samplesParams.page_size = pageSize
  const results = useQueries([
    { queryKey: ['sampleCount', filterDefaults], queryFn: fetchSampleCount },
    { queryKey: ['samples', samplesParams], queryFn: fetchSamples }
  ])
  const queriesComplete = results.every(it => it.isSuccess)
  let sampleCount = (results[0].data) ? results[0].data : []
  let samples = (results[1].data) ? results[1].data : []


  function nextPage() {
    setOffset(offset + pageSize)
  }

  function previousPage() {
    setOffset((offset < pageSize)? 0 : offset - pageSize)
  }

  function exportCSV() {
      searchParams.set('format', 'csv')
      const queryURL = `${apiBaseUrl}/samples?${searchParams.toString()}`
      window.open(queryURL)
  }

  return (
    <>
      <nav>
        <div style={{paddingTop:'5px', paddingBottom:'5px'}}>
        <Button className={`${baseClass}--exportBtn`} style={{marginLeft: '15px', marginRight:'50px'}} variant="contained" onClick={exportCSV}>Export Data</Button>
        <Button className={`${baseClass}--prevPageBtn`} style={{marginRight:'5px'}} 
            variant="contained" onClick={previousPage} 
            disabled={(offset)? false : true}>&lt;</Button>
        <Button className={`${baseClass}--nextPageBtn`} style={{}} 
            variant="contained" onClick={nextPage} 
            disabled={(samples.length < pageSize)? true: false}>&gt;</Button>
          <span style={{marginLeft: '15px'}}>samples {offset} to {(samples.length<pageSize)? offset+samples.length: offset+pageSize} (out of {sampleCount})</span>
        </div>
      </nav>
      <main className={baseClass} style={{ padding: "1rem 0" }}>
       {(!samples) ? <h4>no data</h4>: ''}
            {samples ? 
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
                    <tr key={item.objectid}>
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
