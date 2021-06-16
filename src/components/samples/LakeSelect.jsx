import React, { useRef, useEffect, useState } from "react"
import Select from 'react-select'
import {buildQueryUrl} from '../../ApiUtils'
import "./LakeSelect.css"

function LakeSelect({
    selectStyles,
    activeRepository,
    activeDevice,
    activePlatform,
    activeCruise,
    setActiveLake,
    activeLake,
    minDepth,
    maxDepth,
    startDate,
    geoextent}) {

    // console.log('inside LakeSelect...')
    const baseClass = 'LakeSelect'
    // const [lakes, setLakes] = useState([{value: 'All Lakes'}])
    const [lakes, setLakes] = useState()


    useEffect(() => {
        console.log('getting list of lakes...');

        const queryParams = []
        if (activeRepository) { queryParams.push({name:'repository', value:activeRepository.value})}
        if (activeDevice) { queryParams.push({name:'device', value:activeDevice.value})}
        if (activePlatform) { queryParams.push({name:'platform', value:activePlatform.value})}
        if (activeCruise) { queryParams.push({name:'cruise', value:activeCruise.value})}
        if (minDepth) { queryParams.push({name:'minDepth', value:minDepth})}
        if (maxDepth) { queryParams.push({name:'maxDepth', value:maxDepth})}
        if (startDate) { queryParams.push({name:'startDate', value:startDate})}
        if (geoextent) { queryParams.push({name: 'bbox', value: geoextent.join(',')})}
        console.log(geoextent)
        console.log(`sending ${queryParams.length} criteria...`)
        const queryURL = buildQueryUrl('lakes', queryParams)
        console.log(queryURL)

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

    }, [activeRepository, activeDevice, activePlatform, activeCruise, , minDepth, maxDepth, startDate, geoextent])


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