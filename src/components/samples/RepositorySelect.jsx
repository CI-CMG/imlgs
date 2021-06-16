import React, { useRef, useEffect, useState } from "react";
import Select from 'react-select';
import {buildQueryUrl} from '../../ApiUtils'
import "./RepositorySelect.css"

function RepositorySelect({
    selectStyles,
    activePlatform,
    activeDevice,
    activeLake,
    activeCruise,
    setActiveRepository,
    activeRepository,
    minDepth,
    maxDepth,
    startDate,
    geoextent}) {

    // console.log('inside RepositorySelect...')
    const baseClass = 'RepositorySelect'
    const [repositories, setRepositories] = useState()

    useEffect(() => {
        // console.log('getting list of repositories...');
        const queryParams = [{name:'name_only', value:true}]
        if (activePlatform) { queryParams.push({name:'platform', value:activePlatform.value})}
        if (activeDevice) { queryParams.push({name:'device', value:activeDevice.value})}
        if (activeLake) { queryParams.push({name:'lake', value:activeLake.value})}
        if (activeCruise) { queryParams.push({name:'cruise', value:activeCruise.value})}
        if (minDepth) { queryParams.push({name:'minDepth', value:minDepth})}
        if (maxDepth) { queryParams.push({name:'maxDepth', value:maxDepth})}
        if (startDate) { queryParams.push({name:'startDate', value:startDate})}
        if (geoextent) { queryParams.push({name: 'bbox', value: geoextent.join(',')})}
        
        const queryURL = buildQueryUrl('repositories', queryParams)
        console.log(queryURL);

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
    }, [activePlatform, activeDevice, activeLake, activeCruise, minDepth, maxDepth, startDate, geoextent])


    return(
        <Select
            styles={selectStyles}
            className="basic-single"
            name="repository"
            options={repositories}
            // defaultValue={{label:'testme', value:'AOML'}}
            onChange={setActiveRepository}
            value={activeRepository}
        />
    )
}

export default RepositorySelect;