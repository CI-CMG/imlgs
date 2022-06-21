import React, {useEffect, useState} from "react"
import {Link, useHistory, useParams} from "react-router-dom"
import "./CruisePanel.css"
import {apiBaseUrl} from "../../ApiUtils";


function CruisePanel() {
    const baseClass = 'CruisePanel'
    const {cruiseId} = useParams();

    const history = useHistory()
    const [cruise, setCruise] = useState()

    const url = new URL(location.href);
    const searchParams = new URLSearchParams(url.search)

    useEffect(() => {
        console.debug(`getting cruise ID ${cruiseId}...`)
        fetchCruise()
    }, [])


    // TODO use current filters
    async function fetchCruise() {
        const url = `${apiBaseUrl}/cruises/${cruiseId}?${searchParams.toString()}`
        const response = await fetch(url, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
        if (!response.ok) {
            console.warn("Error fetching data from: " + url)
            return
        }
        const json = await response.json();
        // insert a unique ID to use in JSX list
        let objectid = 0
        json.links.map(item => {
            objectid++
            item['objectid'] = objectid
        })
        console.log(json)
        json.links.forEach(item => {
            console.log(item.LINK)
            console.log(item.TYPE)
        })
        setCruise(json)
    }

    // not sure why this link is not routing properly
    // <Link to={{pathname:`/samples?cruise=${cruiseId}`}}>{cruiseId}</Link>
    return (
        <div className="CruisePanel">
            <h2 style={{paddingLeft: "50px", paddingBottom: "50px"}}>Cruise: {cruiseId}</h2>
            {(!cruise) ? <h4>no data</h4>: ''}
            {cruise ?
                <>
                <ul>
                    <li>Repository: <Link to={{pathname:`/repositories/${cruise.facility_code}`}}>{cruise.facility_code}</Link></li>
                    <li>Ship/Platform: {cruise.platform}</li>
                    {cruise.leg ? <li>Leg: {cruise.leg}</li> : ''}
                </ul>
                <ul>
                    {cruise.links.map(item => (
                        <li style={{listStyle: "none"}} key={item.objectid}><a href={item.LINK} target="_blank" rel="noopener">{item.TYPE}</a></li>
                    ))}
                </ul>
                </>
                : ''
            }
        </div>
    )
}

export default CruisePanel
