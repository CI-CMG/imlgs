import React, { useRef, useEffect, useState } from "react";
import Select from 'react-select';
import {buildQueryUrl} from '../../ApiUtils'
import "./PlatformSelect.css"

function PlatformSelect({
    selectStyles,
    activeRepository,
    activeDevice,
    activeLake,
    activeCruise,
    setActivePlatform,
    activePlatform,
    minDepth,
    maxDepth,
    startDate}) {

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
        if (activeCruise) { queryParams.push({name:'cruise', value:activeCruise.value})}
        if (minDepth) { queryParams.push({name:'minDepth', value:minDepth})}
        if (maxDepth) { queryParams.push({name:'maxDepth', value:maxDepth})}
        if (startDate) { queryParams.push({name:'startDate', value:startDate})}

        const queryURL = buildQueryUrl('platforms', queryParams)        

        // Promise returned from fetch won’t reject on HTTP 404 or 500. 
        fetch(queryURL)
            .then((response) => {
                if (response.status !== 200 ) { throw "failed to retrieve list of platforms"}
                return response.json()
            })
            .then((data) => {
                console.debug(`${data.length} platforms retrieved`)
                let platforms = data.map((item) => {return({value: item})})
                setPlatforms(platforms)
            }).catch(err => console.error('Error in API request: ', err))
    }, [activeRepository, activeDevice, activeLake, activeCruise, , minDepth, maxDepth, startDate])


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