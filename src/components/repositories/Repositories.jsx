import React, {useEffect, useState} from "react"
import {
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom"
import HeaderPanel from "./HeaderPanel"
import Repository from './Repository'
import FooterPanel from './FooterPanel'
import "./Repositories.css"


function Repositories() {
    let match = useRouteMatch()
    const pageName = 'Repositories'
    let { repositoryId } = useParams()
    const [repositoryList, setRepositoryList] = useState([])

    useEffect(() => {
        console.debug('getting list of repositories...')
        fetchRepositories()
    }, [])
    

    // TODO use current filters
    async function fetchRepositories() {
        const url = 'http://localhost:8080/geosamples-api/repositories'
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
        <Switch>
            <Route path={`${match.path}/:repositoryId`}>
                <Repository />
            </Route>
            <Route path={match.path}>
                <>
                    <HeaderPanel pageName={pageName}></HeaderPanel>
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
                    <FooterPanel></FooterPanel>
                </>
            </Route>
        </Switch>
    )
}

export default Repositories