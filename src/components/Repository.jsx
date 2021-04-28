import React, {useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import DOMPurify from 'dompurify'
import FooterPanel from "./FooterPanel"
import HeaderPanel from "./HeaderPanel"
import "./Repository.css"

function Repository() {
    let { repositoryId } = useParams()
    const [repositoryData, setRepositoryData] = useState()
    // const parser = new DOMParser()


    useEffect(() => {
        fetchRepositoryById(repositoryId);
    }, [repositoryId]); // end useEffect
    

    async function fetchRepositoryById(repositoryId) {
        const url = `http://localhost:8080/geosamples-api/repositories/${repositoryId}`
        const response = await fetch(url, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
        // TODO discriminate between server error (500) and invalid ID (404)
        if (response.status === 404 ) {
            console.warn("Invalid repository id: "+repositoryId)
        } else if (response.status === 500) {
            console.warn("Server error")
        }
        if (!response.ok) {
            console.warn("Error fetching data from: " + url)
            return
        }
        const json = await response.json();
        // console.debug(json)
        setRepositoryData(json)
    }


    function sanitizeHTML(dirtyHTML) {
        const clean = DOMPurify.sanitize(dirtyHTML, {USE_PROFILES: {html: true}})
        // const doc = parser.parseFromString(repositoryData.facility_comment, "text/html");
        return(clean);
    }


    return (
        <>
            <HeaderPanel></HeaderPanel>
            <h2>Repository Contact Information</h2>
            {repositoryData? <div className="contactInfoDiv" dangerouslySetInnerHTML={{__html:sanitizeHTML(repositoryData.facility_comment)}}/>: 'no data available'}            
            <FooterPanel></FooterPanel>
        </>
    )
}

export default Repository