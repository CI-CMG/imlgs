import React, {useEffect, useState} from "react"
import { Link } from "react-router-dom"
import {apiBaseUrl} from '../../ApiUtils'
import "./RepositoriesPanel.css"

function RepositoriesPanel() {
    const [repositoryList, setRepositoryList] = useState([])

    useEffect(() => {
        console.debug('getting list of repositories...')
        fetchRepositories()
    }, [])
    

    // TODO use current filters
    async function fetchRepositories() {
        const url = `${apiBaseUrl}/repositories`
        const response = await fetch(url, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
        if (!response.ok) {
            console.warn("Error fetching data from: " + url)
            return
        }
        const json = await response.json();
        // console.debug(json)
        setRepositoryList(json)
    }

    return (
        <div className="repositoriesListDiv">
            <h2>Repositories</h2>
            <ul>
            {
                repositoryList.map(item => (
                    <li key={item.facility_code}>
                    <Link to={{pathname:`/repositories/${item.facility_code}`}}>{item.facility}</Link>&nbsp;
                    ({item.sample_count ? item.sample_count: 'no'} records)
                    </li>
                ))
            }
            </ul>
        </div>
    )
}

export default RepositoriesPanel