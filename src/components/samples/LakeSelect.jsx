import React, { useRef, useEffect, useState } from "react"
import Select from 'react-select'
import {buildQueryUrl} from '../../ApiUtils'
import "./LakeSelect.css"

function LakeSelect({
    apiBaseUrl, 
    selectStyles,
    activeRepository,
    activeDevice,
    activePlatform,
    activeCruise,
    setActiveLake,
    activeLake}) {

    // console.log('inside LakeSelect...')
    const baseClass = 'LakeSelect'
    // const [lakes, setLakes] = useState([{value: 'All Lakes'}])
    const [lakes, setLakes] = useState()


    useEffect(() => {
        // console.log('getting list of lakes...');

        const queryParams = []
        if (activeRepository) { queryParams.push({name:'repository', value:activeRepository.value})}
        if (activeDevice) { queryParams.push({name:'device', value:activeDevice.value})}
        if (activePlatform) { queryParams.push({name:'platform', value:activePlatform.value})}
        if (activeCruise) { queryParams.push({name:'cruise', value:activeCruise.value})}

        const queryURL = buildQueryUrl('lakes', queryParams)

        fetch(queryURL)
            .then((response) => {
                if (response.status !== 200 ) { throw "failed to retrieve list of lakes"}
                return response.json()
            })           
            .then((data) => {
                console.debug(`${data.length} lakes retrieved`)
                let lakes = data.map((item) => {return({value: item})})
                setLakes(lakes)
            }).catch(err => console.error('Error in API request: ', err))

    }, [activeRepository, activeDevice, activePlatform, activeCruise])


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