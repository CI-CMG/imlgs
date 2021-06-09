import React, {useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import {apiBaseUrl} from '../../ApiUtils'
import HeaderPanel from '../HeaderPanel'
import FooterPanel from '../FooterPanel'


function Sample() {
    let { sampleId } = useParams()
    const [sample, setSample] = useState()


    useEffect(async () => {
        console.debug(`getting details for sample ${sampleId}...`);
        const queryURL = `${apiBaseUrl}/samples/${sampleId}`
        // console.debug(queryURL)
    
        const response = await fetch(queryURL)
        if (response.status !== 200) {
            console.error("Error in API request: failed to retrieve data")
            return
        }
        const json = await response.json()
        console.debug(`record retrieved`)
        console.debug(json)
        setSample(json)
      }, []);

    return (
        <>
        <HeaderPanel></HeaderPanel>
        <h3>Requested sample ID: {sampleId}</h3>
        <FooterPanel></FooterPanel>
        </>
    )
}

export default Sample;