import React, { useRef, useEffect, useState } from "react";
import Select from 'react-select';
import "./CruiseSelect.css"

function CruiseSelect({
    apiBaseUrl, 
    selectStyles,
    activeRepository,
    activeDevice,
    activeLake,
    activePlatform,
    setActiveCruise,
    activeCruise}) {

    // console.log('inside CruiseSelect...')
    const baseClass = 'CruiseSelect'
    const [cruises, setCruises] = useState()

    useEffect(() => {
        const queryParams = [{name: 'name_only', value: true}]
        if (activeRepository) { queryParams.push({name:'repository', value:activeRepository.value})}
        if (activeDevice) { queryParams.push({name:'device', value:activeDevice.value})}
        if (activeLake) { queryParams.push({name:'lake', value:activeLake.value})}
        if (activePlatform) { queryParams.push({name:'platform', value:activePlatform.value})}

        const queryURL = buildQueryUrl(`${apiBaseUrl}/cruises`, queryParams)

        fetch(queryURL)
            .then((response) => {
                if (response.status !== 200 ) { throw "failed to retrieve list of cruises"}
                return response.json()
            })
            .then((data) => {
                console.debug(`${data.length} cruises retrieved`)
                let cruises = data.map((item) => {return({value: item})})
                setCruises(cruises)
            }).catch(err => console.error('Error in API request: ', err))
        
    }, [activeRepository, activeDevice, activeLake, activePlatform])


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
            name="cruise"
            options={cruises}
            onChange={setActiveCruise}
            value={activeCruise}
            getOptionLabel={(option) => option.value}
        />
    )
}

export default CruiseSelect;