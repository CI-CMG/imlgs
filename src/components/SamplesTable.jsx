import React from "react"
import { Link, useHistory } from "react-router-dom"
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

import "./SamplesTable.css"


function SamplesTable({data, nextPage, previousPage, offset, pageSize}) {
    console.log('inside SamplesTable...')
    // console.log(data)
    const baseClass = 'SamplesTable'
    const history = useHistory()


    function openSamplesPage() {
        // TODO call w/ original query parameters?
        history.push('/samples')
    }

    function exportCSV() {
        console.log('inside exportCSV...')
    }


    return(
        <div className="SamplesTable">
            {/* <Nav variant="pills"  defaultActiveKey="/samples">
                <Nav.Item size="sm">
                    <Nav.Link size="sm" href="/samples">New Search</Nav.Link>
                </Nav.Item>
            </Nav> */}
            <div style={{paddingTop:'5px', paddingBottom:'5px'}}>
                <Button className={`${baseClass}--newSearchBtn`} style={{marginLeft: '15px', marginRight:'15px'}} variant="primary" size="sm" onClick={openSamplesPage}>New Search</Button>
                <Button className={`${baseClass}--exportBtn`} style={{marginLeft: '15px', marginRight:'50px'}} variant="primary" size="sm" onClick={exportCSV}>Export Data</Button>
                <Button className={`${baseClass}--prevPageBtn`} style={{marginRight:'5px'}} variant="primary" size="sm" onClick={previousPage}>&lt;</Button>
                <Button className={`${baseClass}--nextPageBtn`} style={{}} variant="primary" size="sm" onClick={nextPage}>&gt;</Button>
                <span style={{marginLeft: '15px'}}>samples {offset} to {offset+pageSize}</span>
            </div>

            {(!data) ? <h4>no data</h4>: ''}
            {data && data.length > 1000 ? <h4>too much data to display. Please refine your selection</h4>: ''}
            {data && data.length <= 1000 ? 
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
                    data.map(item => (
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
        </div>
    )
}

export default SamplesTable


{/* <ul>
                    {
                        repositoryList.map(item => (
                            <li key={item.facility_code}>
                            <Link to={{pathname:`/repositories/${item.facility_code}`}}>{item.facility}</Link>&nbsp;
                            ({item.sample_count ? item.sample_count: 'no'} records)
                            </li>
                        ))
                    }
                    </ul> */}