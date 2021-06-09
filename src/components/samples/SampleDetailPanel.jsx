import React, {useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import {apiBaseUrl} from '../../ApiUtils'
import "./SampleDetailPanel.css"


function SampleDetailPanel() {
    const {imlgsId} = useParams();
    const [sample, setSample] = useState()
    const [recordNotFound, setRecordNotFound] = useState()

    useEffect(async () => {
        console.debug(`getting details for sample ${imlgsId}...`);
        const queryURL = `${apiBaseUrl}/samples/${imlgsId}`
        // console.debug(queryURL)
    
        const response = await fetch(queryURL)
        if (response.status == 404) {
            setRecordNotFound(true)
        }
        if (response.status !== 200) {
            console.error("Error in API request: failed to retrieve data")
            return
        }
        const json = await response.json()
        console.debug(`record retrieved`)
        console.debug(json)
        setSample(json)
      }, [imlgsId]);


    return (
        <div className="SampleDetailPanel">
            <h2>Geosample Detail</h2>
            {recordNotFound? <h4>No record with IMLGS Id {imlgsId}</h4>: ''}
            {!recordNotFound && sample? 
                <table>
                <caption></caption>
                <thead></thead>
                <tbody>
                    <tr><td>Repository:</td><td>{sample.facility}</td></tr>
                    <tr><td>Ship:</td><td>{sample.platform}</td></tr>
                    <tr><td>Cruise:</td><td>{sample.cruise}</td></tr>
                    <tr><td>Sample:</td><td>{sample.sample}</td></tr>
                    <tr><td>Device:</td><td>{sample.device}</td></tr>
                    <tr><td>Latitude:</td><td>{sample.lat}</td></tr>
                    <tr><td>Longitude:</td><td>{sample.lon}</td></tr>
                    <tr><td>Water Depth(m):</td><td>{sample.water_depth}</td></tr>
                    <tr><td>Date:</td><td>{sample.begin_date}</td></tr>
                    <tr><td>PI:</td><td>{sample.pi}</td></tr>
                    <tr><td>Storage:</td><td>{sample.storage_meth}</td></tr>
                    <tr><td>Province:</td><td>{sample.province}</td></tr>





                </tbody>

                </table>
            
            : ''}
        </div>
    )
}

export default SampleDetailPanel
