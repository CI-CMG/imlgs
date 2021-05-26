import React, { useRef, useEffect, useState } from "react";
import Select from 'react-select';
import "./RepositorySelect.css"

function RepositorySelect({
    apiBaseUrl, 
    selectStyles,
    activePlatform,
    activeDevice,
    activeLake,
    setActiveRepository,
    activeRepository}) {

    // console.log('inside RepositorySelect...')
    const baseClass = 'RepositorySelect'
    const [repositories, setRepositories] = useState()


    useEffect(() => {
        // console.log('getting list of repositories...');

        const queryParams = [{name:'name_only', value:true}]
        if (activePlatform) { queryParams.push({name:'platform', value:activePlatform.value})}
        if (activeDevice) { queryParams.push({name:'device', value:activeDevice.value})}
        if (activeLake) { queryParams.push({name:'lake', value:activeLake.value})}

        const queryURL = buildQueryUrl(`${apiBaseUrl}/repositories`, queryParams)
        // console.log(queryURL);

        // Promise returned from fetch won’t reject on HTTP 404 or 500. 
        fetch(queryURL)
            .then((response) => {
                if (response.status !== 200 ) { throw "failed to retrieve list of repositories"}
                return response.json()
            })
            .then((data) => {
                console.debug(`${data.length} repositories retrieved`)
                let repositories = data.map((item) => {return({value: item.facility_code, label:item.facility})})
                setRepositories(repositories)
            }).catch(err => console.error('Error in API request: ', err))    
    }, [activePlatform, activeDevice, activeLake])


    //TODO move to utility module
    function buildQueryUrl(baseUrl, filters = []) {
        // short circuit if no filters
        if (! filters) { return baseUrl }

        let queryStrings = []
        filters.forEach((item) => {
            queryStrings.push(`${item.name}=${item.value}`)
        })
        return `${baseUrl}?${queryStrings.join('&')}`
    }

    return(
        <Select
            styles={selectStyles}
            className="basic-single"
            name="repository"
            options={repositories}
            // defaultValue={repositories[0]}
            onChange={setActiveRepository}
            value={activeRepository}
        />
    )
}

export default RepositorySelect;