import React, { useRef, useEffect, useState } from "react";
import Select from 'react-select';
import "./PlatformSelect.css"

function PlatformSelect({
    apiBaseUrl, 
    selectStyles,
    activeRepository,
    activeDevice,
    activeLake,
    setActivePlatform,
    activePlatform}) {

    // console.log('inside PlatformSelect...')
    const baseClass = 'PlatformSelect'
    // const [platforms, setPlatforms] = useState([{value: 'All Platforms'}])
    const [platforms, setPlatforms] = useState()


    useEffect(() => {
        // console.log('getting list of platforms...');

        const queryParams = []
        if (activeRepository) { queryParams.push({name:'repository', value:activeRepository.value})}
        if (activeDevice) { queryParams.push({name:'device', value:activeDevice.value})}
        if (activeLake) { queryParams.push({name:'lake', value:activeLake.value})}

        const queryURL = buildQueryUrl(`${apiBaseUrl}/platforms`, queryParams)

        // Promise returned from fetch won’t reject on HTTP 404 or 500. 
        fetch(queryURL)
            .then((response) => {
                if (response.status !== 200 ) { throw "failed to retrieve list of platforms"}
                return response.json()
            })
            .then((data) => {
                console.debug(`${data.length} platforms retrieved`)
                //TODO: standardize API for returned list
                let platforms = data.map((item) => {return({value: item.name})})
                setPlatforms(platforms)
            }).catch(err => console.error('Error in API request: ', err))
    }, [activeRepository, activeDevice, activeLake])


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
            name="platform"
            options={platforms}
            onChange={setActivePlatform}
            value={activePlatform}
            getOptionLabel={(option) => option.value}
        />
    )
}

export default PlatformSelect;