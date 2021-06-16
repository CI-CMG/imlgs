import React, { useRef, useEffect, useState } from "react"
import Select from 'react-select'
import {buildQueryUrl} from '../../ApiUtils'
import "./CruiseSelect.css"

function CruiseSelect({
    selectStyles,
    activeRepository,
    activeDevice,
    activeLake,
    activePlatform,
    setActiveCruise,
    activeCruise,
    minDepth,
    maxDepth,
    startDate,
    geoextent}) {

    // console.log('inside CruiseSelect...')
    const baseClass = 'CruiseSelect'
    const [cruises, setCruises] = useState()

    useEffect(() => {
        const queryParams = [{name: 'name_only', value: true}]
        if (activeRepository) { queryParams.push({name:'repository', value:activeRepository.value})}
        if (activeDevice) { queryParams.push({name:'device', value:activeDevice.value})}
        if (activeLake) { queryParams.push({name:'lake', value:activeLake.value})}
        if (activePlatform) { queryParams.push({name:'platform', value:activePlatform.value})}
        if (minDepth) { queryParams.push({name:'minDepth', value:minDepth})}
        if (maxDepth) { queryParams.push({name:'maxDepth', value:maxDepth})}
        if (startDate) { queryParams.push({name:'startDate', value:startDate})}
        if (geoextent) { queryParams.push({name: 'bbox', value: geoextent.join(',')})}
        const queryURL = buildQueryUrl('cruises', queryParams)

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
        
    }, [activeRepository, activeDevice, activeLake, activePlatform, minDepth, maxDepth, startDate, geoextent])


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