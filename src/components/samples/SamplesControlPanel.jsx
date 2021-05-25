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


function SamplesControlPanel({setCount, count, geoextent, setLayerDefinitionExpression, zoomToSelected, setZoomToSelected}) {
    // console.log('inside SamplesControlPanel...')
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


    function filterMap() {
        let defs = []
        // WARNING: tight coupling with ArcGIS mapservice layer:
        // https://gis.ngdc.noaa.gov/arcgis/rest/services/Sample_Index/MapServer/0
        if (activeRepository) defs.push(`FACILITY_CODE = '${activeRepository.value}'`)
        if (activePlatform) defs.push(`PLATFORM = '${activePlatform.value}'`)
        if (activeLake) defs.push(`LAKE = '${activeLake.value}'`)
        if (activeDevice) defs.push(`DEVICE = '${activeDevice.value}'`)
        if (activeCruise) defs.push(`CRUISE = '${activeCruise.value}'`)
        if (defs) {
            setLayerDefinitionExpression(defs.join(' and '))
        } else {
            setLayerDefinitionExpression(undefined)
        }
    }
    

    function logFilters() {
        console.log('Filters applied: ')
        if (activeDevice) { console.log('Device: ', activeDevice.value) }
        if (activeRepository) { console.log('Repository: ', activeRepository.value) }
        if (activePlatform) { console.log('Platform: ', activePlatform.value) }
        if (activeLake) { console.log('Lake: ', activeLake.value) }
        if (activeCruise) { console.log('Cruise: ', activeCruise.value) }
        if (geoextent) { console.log('Geoextent: ' + geoextent.join(',')) }
    }
    

    useEffect(async () => {
        console.log('filters have changed, get new count...')

        // triggers map update even if to remove layer definition
        filterMap()
    
        const filters =  [activeDevice, activeLake, activePlatform, activeRepository, activeCruise, geoextent]
        const noFiltersSet = filters.every(val => !val)
    
        if (noFiltersSet) {
            console.log('no filters set')
        } else {
            logFilters()
        }

        // short circuit if all filters are falsey 
        if (noFiltersSet && totalSamplesCount) {
            // console.log('no filters set, selectedCount = totalCount')
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
        // console.debug(queryURL)

        const response = await fetch(queryURL)
        const json = await response.json()
        // console.debug('setting selected sample count to ', json.count)
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
        // console.log('inside resetFilters...')
        setActiveRepository(null)
        setActivePlatform(null)
        setActiveLake(null)
        setActiveDevice(null)
        setActiveCruise(null)
    }

    function checkboxHandler(evt) {
        console.log('inside checkboxHandler with ', evt.target.checked)
        setZoomToSelected(evt.target.checked)
    }

    return (
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
            <Form.Group controlId="zoomToSelected">
                <Form.Check
                    type="checkbox" 
                    label="Zoom to selected features"
                    onChange={checkboxHandler}
                    checked={zoomToSelected}
                 />
            </Form.Group>
        </Form>
       {/* <span>{geoextent?geoextent.join(', '): ''}</span> */}
    </div>
    )
}

export default SamplesControlPanel