import React, { useRef, useEffect, useState } from "react";
import Select from 'react-select';
import "./LakeSelect.css"

function LakeSelect({
    apiBaseUrl, 
    selectStyles,
    activeRepository,
    activeDevice,
    activePlatform,
    setActiveLake,
    activeLake}) {

    console.log('inside LakeSelect...')
    const baseClass = 'LakeSelect'
    // const [lakes, setLakes] = useState([{value: 'All Lakes'}])
    const [lakes, setLakes] = useState()


    useEffect(() => {
        console.log('getting list of lakes...');

        const queryParams = []
        if (activeRepository) { queryParams.push({name:'repository', value:activeRepository.value})}
        if (activeDevice) { queryParams.push({name:'device', value:activeDevice.value})}
        if (activePlatform) { queryParams.push({name:'platform', value:activePlatform.value})}

        const queryURL = buildQueryUrl(`${apiBaseUrl}/lakes`, queryParams)

        try {
            fetch(queryURL)
                .then(response => response.json())
                .then((data) => {
                    console.log(`${data.length} lakes retrieved`)
                    let lakes = data.map((item) => {return({value: item})})
                    setLakes(lakes)
                })
        } catch (error) {
            console.error(error);
        } 
    }, [activeRepository, activeDevice, activePlatform])


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
            name="lake"
            options={lakes}
            // defaultValue={lakes[0]}
            onChange={setActiveLake}
            value={activeLake}
            getOptionLabel={(option) => option.value}
            noOptionsMessage={() => "no lakes available"}
        />
    )
}

export default LakeSelect;