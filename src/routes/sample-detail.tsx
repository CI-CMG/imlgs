import { useParams, Link } from "react-router-dom";
import {
  useQuery,
  useQueries
} from 'react-query'
import { apiBaseUrl, fetchSampleById, fetchIntervalsBySampleId, fetchIntervalByIgsn, lookupCruiseId } from "../geosamples-api";
import Button from '@mui/material/Button';
import './sample-detail.css'


// one-time only - setup mapping between repository Id and DOI (other_link attribute)
let repositoryDOIs = new Map<number, string>()
const repositoryIds = await fetch(`${apiBaseUrl}/repositories/name`)
  .then(response => response.json())
  .then(response => response.items.map(it => it.id))

repositoryIds.forEach(async (id:number) => {
    const doiLink = await fetch(`${apiBaseUrl}/repositories/detail/${id}`)
    .then(response => response.json())
    .then(response => response.other_link)
    repositoryDOIs.set(id, doiLink)
});


export default function SampleDetail() {
  const igsn = 'ECS00001H'
  const { data, error, status} = useQuery(['sampleByIgsn', igsn], fetchIntervalByIgsn, {
    staleTime: Infinity
  });
  console.log('data: ', data)
  


    const {sampleId} = useParams();
    // console.log('redrawing SampleDetail with ', sampleId)
    const baseClass = 'SampleDetail'
    const results = useQueries([
      { queryKey: ['sampleById', {sampleId}], queryFn: fetchSampleById },
      { queryKey: ['intervalsBySampleId', {sampleId}], queryFn: fetchIntervalsBySampleId },
    ])
    const queriesComplete = results.every(it => it.isSuccess)
    // console.log(results)
    let sample = (results[0].data) ? results[0].data : []
    let intervals = (results[0].data?.intervals) ? results[0].data.intervals : []
    // let intervals = (results[1].data) ? results[1].data : []

    console.log(sample)
    // console.log(intervals)


    function formatInterval(interval) {
      console.log('inside formatInterval with ', interval)
      
      // special handling for array of geologic ages
      if (interval.ages?.length) {
        interval.age = interval.ages.join(', ')
      }
      const fieldsList = [
          // {label: 'Interval', field: 'interval' },
          {label: 'Primary Lithologic Composition', field: 'lith1' },
          {label: 'Primary Texture', field: 'text1' },
          {label: 'Secondary Lithologic Composition', field: 'lith2'},
          {label: 'Secondary Texture', field: 'text2' },
          {label: 'Other Component 1', field: 'comp1' },
          {label: 'Other Component 2', field: 'comp2' },
          {label: 'Other Component 3', field: 'comp3' },
          {label: 'Other Component 4', field: 'comp4' },
          {label: 'Other Component 5', field: 'comp5' },
          {label: 'Other Component 6', field: 'comp6' },
          {label: 'Rock Lithology', field: 'rock_lith' },
          {label: 'Rock Mineralogy', field: 'rock_min' },
          {label: 'Rock Weathering and Metamorphism', field: 'weath_meta' },
          {label: 'Rock Glass Remarks and MN/Fe Oxide Coating', field: 'remark'},
          {label: 'Geologic Age', field: 'age' },
          {label: 'Absolute Age Top', field: 'absolute_age_top' },
          {label: 'Absolute Age Bottom', field: 'absolute_age_bottom' },
          {label: 'Color (Munsell Code)', field: 'munsell_code' },
          {label: 'Description', field: 'description' },
          {label: 'Comments', field: 'int_comments' },
          {label: 'Exhausted - No Longer Available', field: 'exhaust_code' },
          {label: 'IGSN', field: 'igsn' },
          {label: 'Photo Link', field: 'photo_link' },
          {label: 'Bulk Weight (kg)', field: 'weight'}
      ]

      let rows = []
      let title = interval.interval ? `Interval ${interval.interval}`: ''
      if (interval.depth_top != null && interval.depth_bot != null) {
          title += `: ${interval.depth_top} to ${interval.depth_bot} cm in core`
      }
      rows.push(<span className={baseClass+'--intervalTitle'}>{title}</span>)
      fieldsList.filter(item => interval[item.field]).forEach(item => {
        rows.push(<><span className={baseClass+'--rowLabel'}>{item.label}:</span> {interval[item.field]}</>)
        // rows.push(`${item.label}: ${interval[item.field]}`)

      })
      return (
        <table className={`${baseClass}--intervalsTable`} key={interval.interval}>
            <thead></thead>
            <tbody>
            {rows.map((row, idx) => <tr key={idx}>
                <td>{row}</td>
            </tr>)}
            </tbody>
        </table>
      )
    }


    function formatLinks(links) {
      // console.log('inside formatLinks with ', links)
      return (
          <div>
              <ul>
                  {links.map((row, idx) => <li key={idx}><a
                      href={row.link}>{row.linklevel} {row.type} at {row.source}</a></li>)}
              </ul>
          </div>
      )
  }

  function formatCruiseLinks(links, cruise) {
    //   console.log('inside formatCruiseLinks with ', links)
      return (
          <div>
              <ul>
                  {links.map((row, idx) => <li key={idx}><a href={row.link}>{cruise} {row.type} at {row.source}</a>
                  </li>)}
              </ul>
          </div>
      )
  }

  //format string of YYYYMMDD to YYYY-MM-DD
  function formatDate(dateString: string) {
      const chars = dateString.split('')
      return(`${chars.slice(0,4).join('')}-${chars.slice(4,6).join('')}-${chars.slice(6,8).join('')}`)
  }


  // WARNING: this is called twice with same Sample record
  function formatSampleDetail(sample) {
      // console.log('inside formatSampleDetail with ', sample)

      // shallow clone. Avoid modifying the state variable which is passed in
      let sampleClone = Object.assign({}, sample)

      // augment or reformat certain fields individually
      if (sampleClone.lon && sampleClone.lat) {
          sampleClone.location = `${sampleClone.lat}, ${sampleClone.lon}`
      }
      if (sampleClone.end_lon && sampleClone.end_lat) {
          sampleClone.end_location = `${sampleClone.end_lat}, ${sampleClone.end_lon}`
      }

      if (sampleClone.water_depth) {
          sampleClone.water_depth = sampleClone.water_depth.toLocaleString()
      }
      if (sampleClone.end_water_depth) {
          sampleClone.end_water_depth = sampleClone.end_water_depth.toLocaleString()
      }

      const doi = repositoryDOIs.get(sample.facility.id)
      if (doi) {
        sampleClone['other_link'] = <a target="_blank" href={doi}>{doi}</a>
      }
      // Date fields seem to all be YYYYMMDD format
      let fieldList = ['last_update', 'begin_date', 'end_date']
      fieldList.filter(i => sampleClone[i]).forEach(i => {
          sampleClone[i] = formatDate(sampleClone[i])
      })
      //TODO why does array literal behave differently?
      //['water_depth', 'end_water_depth'].forEach(i => console.log(i))
      fieldList = ['water_depth', 'end_water_depth']
      fieldList.filter(i => sampleClone[i]).forEach((i) => {
          sampleClone[i] = sampleClone[i].toLocaleString()
      })

      //see https://www.ngdc.noaa.gov/mgg/curator/curatorcoding.html
      const fieldsList = [
          // {label: 'Repository', field: 'facility' },
          {label: 'Ship/Platform', field: 'platform' },
          // {label: 'Cruise ID', field: 'cruise' },
          {label: 'Leg', field: 'leg' },
          {label: 'Sample ID', field: 'sample' },
          {label: 'Sampling Device', field: 'device' },
          {label: 'Latitude/Longitude', field: 'location'},
          {label: 'Ending Latitude/Longitude', field: 'end_location'},
          {label: 'Water Depth (m)', field: 'water_depth' },
          {label: 'Ending Water Depth (m)', field: 'end_water_depth' },
          {label: 'Date Sample Collected', field: 'begin_date' },
          {label: 'Date Sample Collection Ended', field: 'end_date' },
          {label: 'Principal Investigator', field: 'pi' },
          {label: 'Storage Method', field: 'storage_meth' },
          {label: 'Physiographic Province', field: 'province' },
          {label: 'Lake', field: 'lake' },
          {label: 'Core Length (cm)', field: 'cored_length' },
          {label: 'Core Diameter(cm)', field: 'cored_diam' },
          {label: 'Sample Comments', field: 'sample_comments' },
          {label: 'IGSN', field: 'igsn' },
          {label: 'Repository Archive Overview', field: 'other_link' },
      ]

      let tableRowElements = fieldsList.filter(item => sampleClone[item.field]).map(item => {
          return (<tr key={item.field}><td>{item.label}</td><td>{sampleClone[item.field]}</td></tr>)
      })
      // splice in <a> elements
      tableRowElements.splice(0,0,
          <tr key="facility">
            <td>Repository</td>
            <td><Link to={`/repositories/${sampleClone.facility.id}`}>{sampleClone.facility.facility}</Link></td>
        </tr>
      )
      tableRowElements.splice(2,0,
          <tr key="cruise">
            <td>Cruise ID</td>
            <td><Link to={`/cruises/${sampleClone.cruise.id}`}>{sampleClone.cruise.cruise}</Link></td>
        </tr>
      )

    //   if (sampleClone.other_link.startsWith('http')) {
    //       tableRowElements.splice(15,1,
    //           <tr key="DOI_link"><td>DOI</td><td><a href={sampleClone.other_link}>{sampleClone.other_link}</a></td></tr>
    //       )
    //   }
      return tableRowElements
    }

    function exportCSV() {
        let searchParams = new URLSearchParams()
        searchParams.set('format', 'csv')
        searchParams.set('imlgs', sampleId)
        const queryURL = `${apiBaseUrl}/intervals/csv?${searchParams.toString()}`
        // console.log(queryURL)
        window.open(queryURL)
    }

    return (
      <main className={baseClass} style={{ padding: "1rem 0" }}>
        <h2>Data and Information for Sample {sample.sample}</h2>

        {!queriesComplete ? <h4>No record with IMLGS Id {sampleId}</h4> : ''}
            {queriesComplete && sample ?
                <div>
                    <table>
                        <caption></caption>
                        <thead></thead>
                        <tbody>
                        {formatSampleDetail(sample)}
                        </tbody>
                    </table>
                    <br/>
                    {formatLinks(sample.links)}
                    {formatCruiseLinks(sample.cruise.links, sample.cruise.cruise)}
                </div>
                : ''}
            {intervals.length ?
                <Button className={`${baseClass}--exportBtn`} style={{marginLeft: '25px', marginTop: '25px', marginBottom:'25px'}} variant="contained" onClick={exportCSV}>Export Interval Data</Button>        
            : ''}
            {intervals.length ? intervals.map((interval) => formatInterval(interval)) : ''}
            {/* <ol>
                    {
                        intervals.map((item) => (
                            <li key={item.interval}>{formatInterval(item)}</li>
                        ))
                    }
                </ol> */}
            <div style={{padding:"25px"}}>
            <span>see the <a href={'https://www.ngdc.noaa.gov/mgg/curator/curatorcoding.html'}>IMLGS controlled vocabulary</a> for more information</span>
            </div>


      </main>
    );
  }