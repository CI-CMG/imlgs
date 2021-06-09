import React, { useRef, useEffect, useState, useMemo } from "react"
import {
    useParams,
    useLocation,
    useHistory,
    useRouteMatch,
    Link
} from "react-router-dom"
import {buildQueryUrl, apiBaseUrl} from '../../ApiUtils'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Select from 'react-select'
import Nav from 'react-bootstrap/Nav'
import DeviceSelect from './DeviceSelect'
import PlatformSelect from './PlatformSelect'
import LakeSelect from './LakeSelect'
import RepositorySelect from './RepositorySelect'
import CruiseSelect from './CruiseSelect'
import "./SamplesControlPanel.css"


function SamplesControlPanel({
    geoextent, 
    setLayerDefinitionExpression, 
    zoomToSelected, 
    setZoomToSelected}) {
    
    console.log('inside SamplesControlPanel...')
    const baseClass = 'SamplesControlPanel'
    const [totalSamplesCount, setTotalSamplesCount] = useState(0)
    const [selectedSamplesCount, setSelectedSamplesCount] = useState(0)
    const history = useHistory()
    const [tableUrl, setTableUrl] = useState('/samples_table')

    // runs once on component load
    useEffect(async () => {
            const response = await fetch(`${apiBaseUrl}/samples?count_only=true`)
            if (response.status !== 200) {
                console.error("Error in API request: failed to retrieve samples count")
                return
            }
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
    

    function updateTableUrl() {
        let searchParams=[]
        if (activeDevice) { searchParams.push(`device=${activeDevice.value}`) }
        if (activeRepository) { searchParams.push(`repository=${activeRepository.value}`) }
        if (activePlatform) { searchParams.push(`platform=${activePlatform.value}`) }
        if (activeLake) { searchParams.push(`lake=${activeLake.value}`) }
        if (activeCruise) { searchParams.push(`cruise=${activeCruise.value}`) }
        if (geoextent) { searchParams.push(`bbox=${geoextent.join(',')}`) }
        if (searchParams.length) {
            setTableUrl(`/samples_table?${searchParams.join('&')}`)
        } else {
            setTableUrl('/samples_table')
        }
    }

    useEffect(async () => {
        console.log('filters have changed, get new count...')
        updateTableUrl()

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
        const queryURL = buildQueryUrl('samples', queryParams)
        // console.debug(queryURL)

        const response = await fetch(queryURL)
        if (response.status !== 200) {
            console.error("Error in API request: failed to retrieve samples count")
            return
        }
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


    function resetFilters() {
        // console.log('inside resetFilters...')
        setActiveRepository(null)
        setActivePlatform(null)
        setActiveLake(null)
        setActiveDevice(null)
        setActiveCruise(null)
    }

    function checkboxHandler(evt) {
        // console.log('inside checkboxHandler with ', evt.target.checked)
        setZoomToSelected(evt.target.checked)
    }

    function openTable(evt) {
        console.debug(tableUrl)
        history.push(tableUrl)
    }

    return (
    <div className="SamplesControlPanel">
    {/* <Nav variant="pills" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link href="/" eventKey="Home">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/samples" active={true}>Samples</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/cruises" >Cruises</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/repositories" eventKey="Repositories">Repositories</Nav.Link>
                </Nav.Item>
            </Nav>  */}
        <div style={{height: '45px'}}>
            <span className={`${baseClass}--selectedRecords`}>{selectedSamplesCount} of {totalSamplesCount} samples</span>
            <Button className={`${baseClass}--resetBtn`} variant="primary" size="sm" onClick={resetFilters}>Reset</Button>
            {/* <a className={`${baseClass}--HomeBtn`} href="#" class="text-decoration-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
  <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
                </svg>
            </a> */}
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
                        selectStyles={customStyles}
                        setActiveRepository={setActiveRepository}
                        activeRepository={activeRepository}
                        activePlatform={activePlatform}
                        activeDevice={activeDevice}
                        activeLake={activeLake}
                        activeCruise={activeCruise}
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
                        selectStyles={customStyles}
                        setActivePlatform={setActivePlatform}
                        activePlatform={activePlatform}
                        activeRepository={activeRepository}
                        activeDevice={activeDevice}
                        activeLake={activeLake}
                        activeCruise={activeCruise}
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
                        selectStyles={customStyles}
                        setActiveLake={setActiveLake}
                        activeLake={activeLake}
                        activeRepository={activeRepository}
                        activePlatform={activePlatform}
                        activeDevice={activeDevice}
                        activeCruise={activeCruise}
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
                    selectStyles={customStyles}
                    setActiveDevice={setActiveDevice}
                    activeDevice={activeDevice}
                    activeRepository={activeRepository}
                    activePlatform={activePlatform}
                    activeLake={activeLake}
                    activeCruise={activeCruise}
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
                    style={{marginLeft: '15px'}}
                 />
            </Form.Group>
        </Form>
        {/* <Button className={`${baseClass}--openTableBtn`} variant="primary" size="sm" onClick={(e) => router.push({tableUrl})}>Table View</Button> */}
       <Button className={`${baseClass}--openTableBtn`} style={{marginLeft: '15px'}} variant="primary" size="sm" onClick={openTable}>Table View</Button>
    </div>
    )
}
export default SamplesControlPanel