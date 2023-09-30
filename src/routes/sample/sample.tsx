import './sample.css'
import { useLoaderData, useParams, Link } from "react-router-dom"
import { loader, Sample, sampleDetailQuery, Link as SampleLink, Interval } from "./data"
import { useQuery } from "@tanstack/react-query"
const apiBaseUrl = import.meta.env.VITE_apiBaseUrl



function buildDetailsRow(fieldName: string, label: string, value: string) {
  return <tr key={fieldName}><td className='SampleDetail--rowLabel'>{label}</td><td>{value}</td></tr>
}


//format string of YYYYMMDD to YYYY-MM-DD
function formatDate(dateString: string) {
  const chars = dateString.split('')
  return(`${chars.slice(0,4).join('')}-${chars.slice(4,6).join('')}-${chars.slice(6,8).join('')}`)
}


function buildIntervalRow(label:string, value:string) {
  return (<><span className={'SampleDetail--rowLabel'}>{label}:</span> {value}</>)
}


function formatInterval(interval: Interval) {
  console.log('inside formatInterval with ', interval)
  const tableRows: Array<JSX.Element> = []
  let title = interval.interval ? `Interval ${interval.interval}`: ''
  if (interval.depth_top != null && interval.depth_bot != null) {
    title += `: ${interval.depth_top} to ${interval.depth_bot} cm in core`
  }
  tableRows.push(<span className={'SampleDetail--intervalTitle'}>{title}</span>)

  if (interval.lith1 !== undefined) { tableRows.push(buildIntervalRow('Primary Lithologic Composition', interval.lith1)) }
  if (interval.text1 !== undefined) { tableRows.push(buildIntervalRow('Primary Texture', interval.text1)) }
  if (interval.lith2 !== undefined) { tableRows.push(buildIntervalRow('Secondary Lithologic Composition', interval.lith2)) }
  if (interval.text2 !== undefined) { tableRows.push(buildIntervalRow('Primary Lithologic Composition', interval.text2)) }
  if (interval.comp1 !== undefined) { tableRows.push(buildIntervalRow('Other Component 1', interval.comp1)) }
  if (interval.comp2 !== undefined) { tableRows.push(buildIntervalRow('Other Component 2', interval.comp2)) }
  if (interval.comp3 !== undefined) { tableRows.push(buildIntervalRow('Other Component 3', interval.comp3)) }
  if (interval.comp4 !== undefined) { tableRows.push(buildIntervalRow('Other Component 4', interval.comp4)) }
  if (interval.comp5 !== undefined) { tableRows.push(buildIntervalRow('Other Component 5', interval.comp5)) }
  if (interval.comp6 !== undefined) { tableRows.push(buildIntervalRow('Other Component 6', interval.comp6)) }
  if (interval.rock_lith !== undefined) { tableRows.push(buildIntervalRow('Rock Lithology', interval.rock_lith)) }
  if (interval.rock_min !== undefined) { tableRows.push(buildIntervalRow('Rock Mineralogy', interval.rock_min)) }
  if (interval.weath_meta !== undefined) { tableRows.push(buildIntervalRow('Rock Weathering and Metamorphism', interval.weath_meta)) }
  if (interval.remark !== undefined) { tableRows.push(buildIntervalRow('Rock Glass Remarks and MN/Fe Oxide Coating', interval.remark)) }
  if (interval.ages !== undefined && interval.ages.length) { tableRows.push(buildIntervalRow('Geologic Ages', interval.ages.join(', '))) }
  if (interval.absolute_age_top !== undefined) { tableRows.push(buildIntervalRow('Absolute Age Top', interval.absolute_age_top)) }
  if (interval.absolute_age_bot !== undefined) { tableRows.push(buildIntervalRow('Absolute Age Bottom', interval.absolute_age_bot)) }
  if (interval.munsell_code !== undefined) { tableRows.push(buildIntervalRow('Color (Munsell Code)', interval.munsell_code)) }
  if (interval.description !== undefined) { tableRows.push(buildIntervalRow('Description', interval.description)) }
  if (interval.int_comments !== undefined) { tableRows.push(buildIntervalRow('Comments', interval.int_comments)) }
  if (interval.exhaust_code !== undefined) { tableRows.push(buildIntervalRow('Exhausted - No Longer Available', interval.exhaust_code)) }
  if (interval.igsn !== undefined) { tableRows.push(buildIntervalRow('IGSN', interval.igsn)) }
  if (interval.photo_link !== undefined) { tableRows.push(buildIntervalRow('Photo Link', interval.photo_link)) }
  if (interval.weight !== undefined) { tableRows.push(buildIntervalRow('Bulk Weight (kg)', interval.weight.toString())) }

  return (
    <table className={'SampleDetail--intervalsTable'} key={interval.interval}>
        <thead></thead>
        <tbody>
          {tableRows.map((row, idx) => <tr key={idx}><td>{row}</td></tr> ) }
        </tbody>
    </table>
  )
}


function formatSampleDetail(sampleDetail:Sample) {
  // shallow clone. Avoid modifying the state variable which is passed in
  const sample = Object.assign({}, sampleDetail)

  // create rows for each property of interest
  const tableRows: Array<JSX.Element> = []
  tableRows.push(
    <tr key="facility">
      <td className='SampleDetail--rowLabel'>Repository</td>
      <td><Link to={`/repositories/${sample.facility.id}`}>{sample.facility.facility}</Link></td>
    </tr>)
  tableRows.push(buildDetailsRow('platform', 'Ship/Platform', sample.platform))
  tableRows.push(
    <tr key="cruise">
      <td className='SampleDetail--rowLabel'>Cruise ID</td>
      <td><Link to={`/cruises/${sample.cruise.id}`}>{sample.cruise.cruise}</Link></td>
    </tr>)
  if (sample.leg !== undefined) { tableRows.push(buildDetailsRow('leg', 'Leg', sample.leg))}
  if (sample.sample !== undefined) { tableRows.push(buildDetailsRow('sample', 'Sample ID', sample.sample))}
  if (sample.device !== undefined) { tableRows.push(buildDetailsRow('device', 'Sampling Device', sample.device))}
  tableRows.push(buildDetailsRow('location', 'Latitude/Longitude', `${sample.lat}, ${sample.lon}`))
  if (sample.end_lat !== undefined && sample.end_lon !== undefined) {
    tableRows.push(buildDetailsRow('end_location', 'Ending Latitude/Longitude', `${sample.end_lat}, ${sample.end_lon}`))
  }
  if (sample.water_depth !== undefined) {
    tableRows.push(buildDetailsRow('water_depth', 'Water Depth (m)', sample.water_depth.toLocaleString()))
  }
  if (sample.end_water_depth !== undefined) {
    tableRows.push(buildDetailsRow('end_water_depth', 'Ending Water Depth (m)', sample.end_water_depth.toLocaleString()))
  }
  if (sample.begin_date !== undefined) { 
    tableRows.push(buildDetailsRow('begin_date', 'Date Sample Collected', formatDate(sample.begin_date)))
  }
  if (sample.end_date !== undefined) { 
    tableRows.push(buildDetailsRow('end_date', 'Date Sample Collection Ended', formatDate(sample.end_date)))
  }
  if (sample.pi !== undefined) { tableRows.push(buildDetailsRow('pi', 'Principal Investigator', sample.pi))}
  if (sample.storage_meth !== undefined) { tableRows.push(buildDetailsRow('storage_meth', 'Storage Method', sample.storage_meth))}
  if (sample.province !== undefined) { tableRows.push(buildDetailsRow('province', 'Physiographic Province', sample.province))}
  if (sample.lake !== undefined) { tableRows.push(buildDetailsRow('lake', 'Lake', sample.lake))}
  if (sample.cored_length !== undefined) { tableRows.push(buildDetailsRow('cored_length', 'Core Length (cm)', sample.cored_length.toString()))}
  if (sample.cored_diam !== undefined) { tableRows.push(buildDetailsRow('cored_diam', 'Core Diameter(cm)', sample.cored_diam.toString()))}
  if (sample.sample_comments !== undefined) { tableRows.push(buildDetailsRow('sample_comments', 'Sample Comments', sample.sample_comments))}
  if (sample.igsn !== undefined) { tableRows.push(buildDetailsRow('igsn', 'IGSN', sample.igsn))}
  if (sample.facility.doi) {
    tableRows.push(
    <tr key="other_link">
    <td className='SampleDetail--rowLabel'>Repository Archive Overview</td>
    <td><a target="_blank" href={sample.facility.doi}>{sample.facility.doi}</a></td>
    </tr>
  )}

  return tableRows
}

function formatLinks(links:Array<SampleLink>) {
  return (
    <div>
        <ul>
            {links.map((row, idx) => <li key={idx}><a
                href={row.link}>{row.link_level} {row.type} at {row.source}</a></li>)}
        </ul>
    </div>
)}

function formatCruiseLinks(links:Array<SampleLink>, cruise:string) {
  return (
      <div>
          <ul>
              {links.map((row, idx) => <li key={idx}><a href={row.link}>{cruise} {row.type} at {row.source}</a>
              </li>)}
          </ul>
      </div>
  )
}


export default function SampleDetail() {
  const baseClass = 'SampleDetail'

  // react-router loader provides data when page loads
  const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>
  const {id} = useParams()
  if (!id) {
    throw new Error("IMLGS Id must be provided")
  }

  // react-query cache initialized with data from react-router loader and manages all subsequent updates
  const { data: sampleDetail }: {data: Sample} = useQuery({
    ...sampleDetailQuery(id), 
    initialData})
  console.log(sampleDetail)


  function exportCSV() {
    const queryURL = `${apiBaseUrl}/intervals/csv?imlgs=${id}`
    window.open(queryURL)
  }
  

  return (
    <main className={baseClass} style={{ padding: "1rem 0" }}>
      <h2>Data and Information for Sample {sampleDetail.sample}</h2>
      <div id="sampleDetails">
        <table className={`${baseClass}--table`}>
            <caption></caption>
            <thead></thead>
            <tbody>
            {formatSampleDetail(sampleDetail)}
            </tbody>
        </table>
        <br/>
        {sampleDetail.links ? formatLinks(sampleDetail.links) : '' }
        {sampleDetail.cruise.links ? formatCruiseLinks(sampleDetail.cruise.links, sampleDetail.cruise.cruise): ''}

        {sampleDetail.intervals.length ?
          <button 
            className={`${baseClass}--exportButton`} 
            style={{marginLeft: '25px', marginTop: '25px', marginBottom:'25px'}}  
            onClick={exportCSV}
          >
            Export Interval Data
          </button>        
        : ''}
      </div>
      
      <div id="intervals">
        {sampleDetail.intervals.length ? sampleDetail.intervals.map(interval => formatInterval(interval)) : ''}
      </div>

        <span>see the <a href={'https://www.ngdc.noaa.gov/mgg/curator/curatorcoding.html'}>IMLGS controlled vocabulary</a> for more information</span>

    </main>
  )
}