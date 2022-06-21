import React, { useRef, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import DropdownButton from 'react-bootstrap/DropdownButton'
// import Dropdown from 'react-bootstrap/Dropdown'
import Select from 'react-select'
import DeviceSelect from './DeviceSelect'
import PlatformSelect from './PlatformSelect'
import LakeSelect from './LakeSelect'
import RepositorySelect from './RepositorySelect'
import "./SamplesControlPanel.css"


function SamplesControlPanel({setCount, count}) {
    // console.log('inside SamplesControlPanel...')
    const baseClass = 'SamplesControlPanel'
    // const apiBaseUrl = 'http://localhost:8080/geosamples-api'
    const apiBaseUrl = 'https://www.ngdc.noaa.gov/geosamples-api'
    const [totalSamplesCount, setTotalSamplesCount] = useState(0)
    const [selectedSamplesCount, setSelectedSamplesCount] = useState(0)


    // useEffect(() => {
    //     try {
    //         fetch(`${apiBaseUrl}/samples?count_only=true`)
    //             .then(response => response.json())
    //             .then(data => setTotalSamples(data.count) )
    //     } catch (error) {
    //         console.error('Error getting total count of Samples: ', error);
    //     } 
    // },[])

    // runs once on component load
    useEffect(async () => {
            const response = await fetch(`${apiBaseUrl}/samples?count_only=true`)
            const json = await response.json()
            console.debug('setting total sample count to ', json.count)
            setTotalSamplesCount(json.count)
    },[])

    // reflect all the currently available options in select widgets
    // TODO: replace w/ selectOptions equivilent
    // const [repositories, setRepositories] = useState([{facility_code: 'ALL', facility: 'All Repositories'}])
    // const [platforms, setPlatforms] = useState([{name: 'All Platforms'}])
    
    // const [selectOptions, setSelectOptions] = useState(new Map([
    //     // ['platforms', [{name: 'All Platforms'}]],
    //     ['repositories', [{facility_code: 'ALL', facility: 'All Repositories'}]],
    //     ['lakes', [{value: 'All Lakes'}]],
    //     ['devices', [{name: 'All Devices'}]],
    //     ['cruises', [{name: 'All Cruises'}]]
    // ]))

    // reflect the currently selected option in the select widgets.  These are
    // what trigger updates of the select options above
    const [activeRepository, setActiveRepository] = useState()
    const [activePlatform, setActivePlatform] = useState()
    const [activeLake, setActiveLake] = useState()
    const [activeDevice, setActiveDevice] = useState()

    // Map of all filters currently set
    // const [filters, setFilters] = useState(new Map())

    
    // async function fetchRepositories() {
    //     console.log('inside fetchRepositories...')
    //     const response = await fetch('http://localhost:8080/geosamples-api/repositories?name_only=true')
    //     console.log("response: ", response)
    //     if (!response.ok) {
    //         throw new Error('Network response was not ok')
    //     }
    //     // returns promise
    //     return response.json()
    // }


    useEffect(async () => {
        console.log('filters have changed, get new count...')
        const filters = [activeDevice, activeLake, activePlatform, activeRepository]
        console.log('Device: ',activeDevice)
        console.log('Lake: ', activeLake)
        console.log('Platform: ', activePlatform)
        console.log('Repository: ', activeRepository)
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

        const queryURL = buildQueryUrl(`${apiBaseUrl}/samples`, queryParams)
        console.debug(queryURL)
        const response = await fetch(queryURL)
        const json = await response.json()
        console.debug('setting selected sample count to ', json.count)
        setSelectedSamplesCount(json.count)
    },[activeDevice, activeLake, activePlatform, activeRepository])

    // // repositories
    // useEffect(() => {
    //     console.log('getting list of repositories...')
    //     const queryParams = new Map([...filters, ['name_only', true]])
    //     // exclude redundent parameter
    //     queryParams.delete('repository')
    //     const queryURL = buildQueryUrl(`${apiBaseUrl}/repositories`, queryParams)
    //     console.debug(queryURL)

    //     try {
    //         fetch(queryURL)
    //             .then(response => response.json())
    //             .then((data) => {
    //                 data.unshift({facility_code: 'ALL', facility: 'All Repositories'})
    //                 setRepositories(data)
    //             })
    //     } catch (error) {
    //         console.error(error);
    //     } 
    // }, [activePlatform, activeLake])


    // // lakes
    // useEffect(() => {
    //     console.log('getting list of lakes...');
        
    //     const queryParams = new Map(filters)
    //     // exclude redundent parameter
    //     queryParams.delete('lake')
    //     const queryURL = buildQueryUrl(`${apiBaseUrl}/lakes`, queryParams)
    //     console.debug(queryURL)

    //     try {
    //         fetch(queryURL)
    //             .then(response => response.json())
    //             .then((data) => {
    //                 data.unshift('All Lakes')
    //                 // API returns simple list of names, but Select widget seems to need key/value Map
    //                 let lakes = data.map((item) => {return({value: item})})
    //                 // let lakes = data.map((item)=> {return({value: item, label: item})})
    //                 // console.log(lakes)
    //                 selectOptions.set('lakes', lakes)
    //                 setSelectOptions(selectOptions)
    //             })
    //     } catch (error) {
    //         console.error(error);
    //     } 
    // }, [activeRepository, activePlatform])
/*
    // lakes
    useEffect(() => {
        console.log('getting list of lakes...');
        const queryURL = apiBaseUrl + '/repositories?name_only=true'

        try {
            fetch(queryURL)
                .then(response => response.json())
                .then(data => setRepositories(data) )
        } catch (error) {
            console.error(error);
        } 
    }, [platforms, repositories, devices, cruises])

    // cruises
    useEffect(() => {
        console.log('getting list of cruises...');
        const queryURL = apiBaseUrl + '/repositories?name_only=true'

        try {
            fetch(queryURL)
                .then(response => response.json())
                .then(data => setRepositories(data) )
        } catch (error) {
            console.error(error);
        } 
    }, [platforms, lakes, devices, repositories])
*/

    // function buildQueryUrl(baseUrl, filters) {
    //     // short circuit if no filters
    //     if (! filters) { return baseUrl }

    //     let queryStrings = []
    //     filters.forEach((value, key) => {
    //         queryStrings.push(`${key}=${value}`)
    //     })
    //     return `${baseUrl}?${queryStrings.join('&')}`
    // }

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


    // used to style 
    const customStyles = {
        control: styles => ({ ...styles, fontSize: 'small'}),
        option: styles => ({ ...styles, fontSize: 'small'}),
        container: styles => ({ ...styles, width: 290})
    }


    // function repositoryChangeHandler(selectedOption) {
    //     const value = selectedOption.facility_code
    //     console.log('repository changed to ', value)

    //     if (value === 'ALL') {
    //         setActiveRepository()
    //         filters.delete('repository')
    //         setFilters(new Map([...filters]))
    //     } else {
    //         setActiveRepository(value)
    //         setFilters(new Map([...filters, ['repository', value]]))
    //     }
    // }

    
    // function platformChangeHandler(selectedOption) {
    //     const value = selectedOption.name
    //     console.log('platform changed to ', value)

    //     if (value === 'All Platforms') {
    //         console.debug('removing platform filter...')
    //         setActivePlatform()
    //         filters.delete('platform')
    //         setFilters(new Map([...filters]))
    //     } else {
    //         console.log('adding platform filter ', value)
    //         setActivePlatform(value)
    //         setFilters(new Map([...filters, ['platform', value]]))
    //     }
    // }


    // function lakeChangeHandler(selectedOption) {
    //     setActiveLake(selectedOption)
    //     console.log(selectedOption)
    //     const value = selectedOption.name
    //     console.log('lake changed to ', value)

    //     if (value === 'All Lakes') {
    //         console.debug('removing lake filter...')
    //         // setActiveLake()
    //         filters.delete('lake')
    //         setFilters(new Map([...filters]))
    //     } else {
    //         console.log('adding lake filter ', value)
    //         // setActiveLake(value)
    //         setFilters(new Map([...filters, ['lake', value]]))
    //     }
    // }


    // function setRepository(value) {
    //     console.log('inside setRepository with ',value)
    //     if (value === 'ALL') {
    //         setActiveRepository()
    //         filters.delete('repository')
    //     } else {
    //         setActiveRepository(value)
    //         setFilters(new Map([...filters, ['repository', value]]))
    //     }
    //     console.log('filters: ', filters)
    // }

    // function setPlatform(value) {
    //     console.log('inside setPlatform with ',value)
    //     if (value === 'All Platforms') {
    //         setActivePlatform()
    //         filters.delete('platform')
    //     } else {
    //         setActivePlatform(value)
    //         setFilters(new Map([...filters, ['platform', value]]))
    //     }
    //     console.log('filters: ', filters)
    // }

    function resetFilters() {
        console.log('inside resetFilters...')
        setActiveRepository({value: 'All Repositories', label: 'All Repositories'})
        setActivePlatform({value: 'All Platforms'})
        setActiveLake({value: 'All Lakes'})
        setActiveDevice({value: 'All Devices'})
    }

    // let selectedPlatform = {name: "All Platforms"}

    // console.log(selectOptions.get('lakes')[0])

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
                    {/* <Select
                        styles={customStyles}
                        className="basic-single"
                        defaultValue={repositories[0]}
                        name="repository"
                        options={repositories}
                        getOptionLabel={(option) => option.facility}
                        getOptionValue={(option) => option.facility_code}
                        onChange={repositoryChangeHandler}
                    /> */}
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

            {/* <DropdownButton id="repositoryDropdown" title="Repository">
                <Dropdown.Item key="ALL" onSelect={(key) => setRepository(key)} eventKey="ALL">All Repositories</Dropdown.Item>
                { repositories.map(item => (
                    <Dropdown.Item key={item.facility_code} onSelect={(key) => setRepository(key)} eventKey={item.facility_code}>{item.facility}</Dropdown.Item>
                ))}
            </DropdownButton> */}
        </Form>
       
    </div>
    )

}

export default SamplesControlPanel