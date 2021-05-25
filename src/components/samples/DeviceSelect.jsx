import React, { useRef, useEffect, useState } from "react";
import Select from 'react-select';
import "./DeviceSelect.css"

function DeviceSelect({
    apiBaseUrl, 
    selectStyles,
    activeRepository,
    activePlatform,
    activeLake,
    setActiveDevice,
    activeDevice}) {

    // console.log('inside DeviceSelect...')
    const baseClass = 'DeviceSelect'
    const [devices, setDevices] = useState()


    useEffect(() => {
        // console.log('getting list of devices...');

        const queryParams = []
        if (activeRepository) { queryParams.push({name:'repository', value:activeRepository.value})}
        if (activePlatform) { queryParams.push({name:'platform', value:activePlatform.value})}
        if (activeLake) { queryParams.push({name:'lake', value:activeLake.value})}

        const queryURL = buildQueryUrl(`${apiBaseUrl}/devices`, queryParams)

        try {
            fetch(queryURL)
                .then(response => response.json())
                .then((data) => {
                    console.log(`${data.length} devices retrieved`)
                    // API returns simple list of names, but Select needs key/value Map
                    let devices = data.map((item) => {return({value: item})})
                    setDevices(devices)
                })
        } catch (error) {
            console.error(error);
        } 
    }, [activeRepository, activePlatform, activeLake])


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
            name="device"
            options={devices}
            // defaultValue={devices[0]}
            onChange={setActiveDevice}
            value={activeDevice}
            getOptionLabel={(option) => option.value}
        />
    )
}

export default DeviceSelect;