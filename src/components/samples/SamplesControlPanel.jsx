import React, { useRef, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Select from 'react-select'
import DeviceSelect from './DeviceSelect'
import PlatformSelect from './PlatformSelect'
import LakeSelect from './LakeSelect'
import RepositorySelect from './RepositorySelect'
import CruiseSelect from './CruiseSelect'
import "./SamplesControlPanel.css"


function SamplesControlPanel({setCount, count, geoextent}) {
    console.log('inside SamplesControlPanel...')
    const baseClass = 'SamplesControlPanel'
    const apiBaseUrl = 'http://localhost:8080/geosamples-api'
    const [totalSamplesCount, setTotalSamplesCount] = useState(0)
    const [selectedSamplesCount, setSelectedSamplesCount] = useState(0)

    // runs once on component load
    useEffect(async () => {
            const response = await fetch(`${apiBaseUrl}/samples?count_only=true`)
            const json = await response.json()
            console.debug('setting total sample count to ', json.count)
            setTotalSamplesCount(json.count)
    },[])

    // reflect the currently selected option in the select widgets.  These are
    // what trigger updates of the select options above
    const [activeRepository, setActiveRepository] = useState()
    const [activePlatform, setActivePlatform] = useState()
    const [activeLake, setActiveLake] = useState()
    const [activeDevice, setActiveDevice] = useState()
    const [activeCruise, setActiveCruise] = useState()

    useEffect(async () => {
        console.log('filters have changed, get new count...')
        const filters = [activeDevice, activeLake, activePlatform, activeRepository, activeCruise, geoextent]
        console.log('Device: ',activeDevice)
        console.log('Lake: ', activeLake)
        console.log('Platform: ', activePlatform)
        console.log('Repository: ', activeRepository)
        console.log('Cruise: ', activeCruise)
        // short circuit if all filters are falsey 
        if (filters.every(val => val) && totalSamplesCount) {
            console.log('no filters set, selectedCount = totalCount')
            setSelectedSamplesCount(totalSamplesCount)
            return    
        }
        const queryParams = [{name: 'count_only', value: true}]
        if (activeDevice) { queryParams.push({name:'device', value:activeDevice.value})}
        if (activeRepository) { queryParams.push({name:'repository', value:activeRepository.value})}
        if (activePlatform) { queryParams.push({name:'platform', value:activePlatform.value})}
        if (activeLake) { queryParams.push({name:'lake', value:activeLake.value})}
        if (activeCruise) { queryParams.push({name:'cruise', value:activeCruise.value})}
        if (geoextent) { queryParams.push({name: 'bbox', value: geoextent.join(',')})}

        const queryURL = buildQueryUrl(`${apiBaseUrl}/samples`, queryParams)
        console.debug(queryURL)
        const response = await fetch(queryURL)
        const json = await response.json()
        console.debug('setting selected sample count to ', json.count)
        setSelectedSamplesCount(json.count)
    },[activeDevice, activeLake, activePlatform, activeRepository, activeCruise, geoextent])

    // used to style Select components
    const customStyles = {
        control: styles => ({ ...styles, fontSize: 'small'}),
        option: styles => ({ ...styles, fontSize: 'small'}),
        container: styles => ({ ...styles, width: 290})
    }
    

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


    function resetFilters() {
        console.log('inside resetFilters...')
        setActiveRepository(null)
        setActivePlatform(null)
        setActiveLake(null)
        setActiveDevice(null)
        setActiveCruise(null)
    }

    return(
    <div className="SamplesControlPanel">
        <div style={{height: '45px'}}>
            <span className={`${baseClass}--selectedRecords`}>{selectedSamplesCount} of {totalSamplesCount} samples</span>
            <Button className={`${baseClass}--resetBtn`} variant="primary" size="sm" onClick={resetFilters}>Reset</Button>
            <hr style={{borderWidth: '3px'}}/>
        </div>

        <Form>
            <Form.Group controlId="Repository">
                <Form.Row style={{margin:"5px"}}>
                <Col>
                    <Form.Label>Repository</Form.Label>
                </Col>
                <Col>
                    <RepositorySelect
                        apiBaseUrl={apiBaseUrl}
                        selectStyles={customStyles}
                        setActiveRepository={setActiveRepository}
                        activeRepository={activeRepository}
                        activePlatform={activePlatform}
                        activeDevice={activeDevice}
                        activeLake={activeLake}
                    />
                </Col>
                </Form.Row>
            </Form.Group>

            <Form.Group controlId="Platform">
                <Form.Row style={{margin:"5px"}}>
                <Col>
                    <Form.Label>Platform</Form.Label>
                </Col>
                <Col>
                    <PlatformSelect
                        apiBaseUrl={apiBaseUrl}
                        selectStyles={customStyles}
                        setActivePlatform={setActivePlatform}
                        activePlatform={activePlatform}
                        activeRepository={activeRepository}
                        activeDevice={activeDevice}
                        activeLake={activeLake}
                    />
                </Col>
                </Form.Row>
            </Form.Group>

            <Form.Group controlId="Lakes">
                <Form.Row style={{margin:"5px"}}>
                <Col>
                    <Form.Label>Lake</Form.Label>
                </Col>
                <Col>
                    <LakeSelect
                        apiBaseUrl={apiBaseUrl}
                        selectStyles={customStyles}
                        setActiveLake={setActiveLake}
                        activeLake={activeLake}
                        activeRepository={activeRepository}
                        activePlatform={activePlatform}
                        activeDevice={activeDevice}
                    />
                </Col>
                </Form.Row>
            </Form.Group>

            <Form.Group controlId="Devices">
                <Form.Row style={{margin:"5px"}}>
                <Col>
                    <Form.Label>Device</Form.Label>
                </Col>
                <Col>
                <DeviceSelect
                    apiBaseUrl={apiBaseUrl}
                    selectStyles={customStyles}
                    setActiveDevice={setActiveDevice}
                    activeDevice={activeDevice}
                    activeRepository={activeRepository}
                    activePlatform={activePlatform}
                    activeLake={activeLake}
                />
                </Col>
                </Form.Row>
            </Form.Group>

            <Form.Group controlId="Cruises">
                <Form.Row style={{margin:"5px"}}>
                <Col>
                    <Form.Label>Cruise</Form.Label>
                </Col>
                <Col>
                <CruiseSelect
                    apiBaseUrl={apiBaseUrl}
                    selectStyles={customStyles}
                    setActiveCruise={setActiveCruise}
                    activeCruise={activeCruise}
                    activeRepository={activeRepository}
                    activePlatform={activePlatform}
                    activeLake={activeLake}
                    activeDevice={activeDevice}
                />
                </Col>
                </Form.Row>
            </Form.Group>
        </Form>
       <span>{geoextent?geoextent.join(', '): ''}</span>
    </div>
    )
}

export default SamplesControlPanel