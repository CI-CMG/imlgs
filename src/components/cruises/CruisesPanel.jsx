import React, { useRef, useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import {apiBaseUrl} from '../../ApiUtils'
// import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import "./CruisesPanel.css"


function CruisesPanel() {
    const baseClass = 'CruisesTable'
    const history = useHistory()
    const [cruiseList, setCruiseList] = useState([])

    const url = new URL(location.href);
    const searchParams = new URLSearchParams(url.search)

    useEffect(() => {
        console.debug('getting list of cruises...')
        fetchCruises()
    }, [])
    

    // TODO use current filters
    async function fetchCruises() {
        const url = `${apiBaseUrl}/cruises?${searchParams.toString()}`
        const response = await fetch(url, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
        if (!response.ok) {
            console.warn("Error fetching data from: " + url)
            return
        }
        const json = await response.json();
        let objectid = 0
        json.map(item => {
            objectid++ 
            item['objectid'] = objectid
        })
        // console.debug(json)
        setCruiseList(json)
    }


    function openHomePage() {
        // TODO new query - call w/ original query parameters?
        history.push('/')
    }


    return (
        <div className="SamplesTable">
        {/* <Nav variant="pills"  defaultActiveKey="/samples">
            <Nav.Item size="sm">
                <Nav.Link size="sm" href="/samples">New Search</Nav.Link>
            </Nav.Item>
        </Nav> */}
        <div style={{paddingTop:'5px', paddingBottom:'5px'}}>
            <Button className={`${baseClass}--newSearchBtn`} style={{marginLeft: '15px', marginRight:'15px'}} variant="primary" size="sm" onClick={openHomePage}>Home</Button>
        </div>

        {(!cruiseList) ? <h4>no data</h4>: ''}
        {cruiseList ? 
            <table className={`${baseClass}--datatable`}>
            <thead>
            <tr>
                <th>Cruise</th>
                <th>Alt Cruise/Leg</th>
                <th>Ship/Platform</th>
                <th>Repository</th>
            </tr>
            </thead>
            <tbody>{
                cruiseList.map(item => (
                <tr key={item.objectid}>
                <td><Link to={{pathname:`/cruises/${item.cruise}`}}>{item.cruise}</Link></td>
                <td>{item.leg}</td>
                <td>{item.platform}</td>
                <td><Link to={{pathname:`/repositories/${item.facility_code}`}}>{item.facility_code}</Link></td>
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

export default CruisesPanel