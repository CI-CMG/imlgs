import React, {useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import {apiBaseUrl} from '../../ApiUtils'
import DOMPurify from 'dompurify'
import FooterPanel from "../FooterPanel"
import HeaderPanel from "../HeaderPanel"
import "./RepositoryDetail.css"

function Repository() {
    let { repositoryId } = useParams()
    const [repositoryData, setRepositoryData] = useState()
    // const parser = new DOMParser()

    useEffect(() => {
        fetchRepositoryById(repositoryId);
    }, [repositoryId]);
    

    async function fetchRepositoryById(repositoryId) {
        const url = `${apiBaseUrl}/repositories/${repositoryId}`
        const response = await fetch(url, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
        if (response.status === 404 ) {
            console.warn("Invalid repository id: "+repositoryId)
        } else if (response.status === 500) {
            console.warn("Server error")
        }
        if (!response.ok) {
            console.warn("Error fetching data from: " + url)
            return
        }
        const json = await response.json()
        // console.debug(json)
        setRepositoryData(json)
    }


    function sanitizeHTML(dirtyHTML) {
        const clean = DOMPurify.sanitize(dirtyHTML, {USE_PROFILES: {html: true}})
        // const doc = parser.parseFromString(repositoryData.facility_comment, "text/html");
        return(clean);
    }


    return (
        <div className={"RepositoryDetail"}>
            <h2>Repository Contact Information</h2>
            {repositoryData?
                <div className="contactInfoDiv" dangerouslySetInnerHTML={{__html:sanitizeHTML(repositoryData.facility_comment)}}/>:
                'no data available'}
        </div>
    )
}

export default Repository