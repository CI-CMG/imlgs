import React, { useRef, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Select from 'react-select';
import "./SamplesControlPanel.css"


function SamplesControlPanel({setCount, count}) {
    // console.log('inside SamplesControlPanel...')
    const apiBaseUrl = 'http://localhost:8080/geosamples-api'
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
    const [repositories, setRepositories] = useState([{facility_code: 'ALL', facility: 'All Repositories'}])
    const [platforms, setPlatforms] = useState([{name: 'All Platforms'}])
    // const [lakes, setLakes] = useState([{name: 'All Platforms'}])
    const [devices, setDevices] = useState([])
    const [cruises, setCruises] = useState([])
    const [selectOptions, setSelectOptions] = useState(new Map([
        ['platforms', ['All Platforms']],
        ['repositories', ['All Repositories']],
        ['lakes', [{name: 'All Lakes'}]]
    ]))

    // reflect the currently selected option in the select widgets.  These are
    // what trigger updates of the select options above
    const [activeRepository, setActiveRepository] = useState()
    const [activePlatform, setActivePlatform] = useState()
    const [activeLake, setActiveLake] = useState()

    // Map of all filters currently set
    const [filters, setFilters] = useState(new Map())

    
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
        // short circuit if no filters
        if (! filters.size && totalSamplesCount) {
            console.log('no filters set, selectedCount = totalCount')
            setSelectedSamplesCount(totalSamplesCount)
            return    
        }
        let queryURL = apiBaseUrl + '/samples?count_only=true'
        const queryString = buildUrlQueryString()
        if (queryString) { queryURL += '&' + queryString }
        console.debug(queryURL)
        const response = await fetch(queryURL)
        const json = await response.json()
        console.debug('setting selected sample count to ', json.count)
        setSelectedSamplesCount(json.count)
    },[filters])

    // repositories
    useEffect(() => {
        console.log('getting list of repositories...');
        let queryURL = apiBaseUrl + '/repositories?name_only=true'
        const queryString = buildUrlQueryString()
        if (queryString) { queryURL += '&' + queryString }
        console.debug(queryURL)

        try {
            fetch(queryURL)
                .then(response => response.json())
                .then((data) => {
                    data.unshift({facility_code: 'ALL', facility: 'All Repositories'})
                    setRepositories(data)
                })
        } catch (error) {
            console.error(error);
        } 
    }, [activePlatform, activeLake])

    // platforms
    useEffect(() => {
        console.log('getting list of platforms...');
        let queryURL = `${apiBaseUrl}/platforms`
        const queryString = buildUrlQueryString()
        if (queryString) { queryURL += `?${queryString}` }
        console.debug(queryURL)

        try {
            fetch(queryURL)
                .then(response => response.json())
                .then((data) => {
                    data.unshift({name: 'All Platforms'})
                    setPlatforms(data)} )
        } catch (error) {
            console.error(error);
        } 
    }, [activeRepository, activeLake])

    // lakes
    useEffect(() => {
        console.log('getting list of lakes...');
        let queryURL = `${apiBaseUrl}/lakes`
        const queryString = buildUrlQueryString()
        if (queryString) { queryURL += `?${queryString}` }
        console.debug(queryURL)

        try {
            fetch(queryURL)
                .then(response => response.json())
                .then((data) => {
                    data.unshift('All Lakes')
                    // API returns simple list of names, but Select widget seems to need key/value Map
                    let lakes = data.map((item) => {return({name: item})})
                    selectOptions.set('lakes', lakes)
                    setSelectOptions(selectOptions)
                })
        } catch (error) {
            console.error(error);
        } 
    }, [activeRepository, activePlatform])
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

    // devices
    useEffect(() => {
        console.log('getting list of devices...');
        const queryURL = apiBaseUrl + '/repositories?name_only=true'

        try {
            fetch(queryURL)
                .then(response => response.json())
                .then(data => setRepositories(data) )
        } catch (error) {
            console.error(error);
        } 
    }, [platforms, lakes, repositories, cruises])

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

    function buildUrlQueryString() {
        if (! filters) { return '' }
        let queryStrings = []
        filters.forEach((value, key) => {
            queryStrings.push(`${key}=${value}`)
        })
        return queryStrings.join('&')
    }

    // used to style 
    const customStyles = {
        control: styles => ({ ...styles, fontSize: 'small'}),
        option: styles => ({ ...styles, fontSize: 'small'}),
        container: styles => ({ ...styles, width: 290})
    }


    function repositoryChangeHandler(selectedOption) {
        const value = selectedOption.facility_code
        console.log('repository changed to ', value)

        if (value === 'ALL') {
            setActiveRepository()
            filters.delete('repository')
            setFilters(new Map([...filters]))
        } else {
            setActiveRepository(value)
            setFilters(new Map([...filters, ['repository', value]]))
        }
    }


    
    function platformChangeHandler(selectedOption) {
        const value = selectedOption.name
        console.log('platform changed to ', value)

        if (value === 'All Platforms') {
            console.debug('removing platform filter...')
            setActivePlatform()
            filters.delete('platform')
            setFilters(new Map([...filters]))
        } else {
            console.log('adding platform filter ', value)
            setActivePlatform(value)
            setFilters(new Map([...filters, ['platform', value]]))
        }
    }


    function lakeChangeHandler(selectedOption) {
        const value = selectedOption.name
        console.log('lake changed to ', value)

        if (value === 'All Lakes') {
            console.debug('removing lake filter...')
            setActiveLake()
            filters.delete('lake')
            setFilters(new Map([...filters]))
        } else {
            console.log('adding lake filter ', value)
            setActiveLake(value)
            setFilters(new Map([...filters, ['lake', value]]))
        }
    }


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

    return(
    <div className="SamplesControlPanel">
         <span>{selectedSamplesCount} of {totalSamplesCount} samples</span>
         <hr/>

        <Form>
            <Form.Group controlId="Repository">
                <Form.Row style={{margin:"5px"}}>
                <Col>
                    <Form.Label>Repository</Form.Label>
                </Col>
                <Col>
                    <Select
                        styles={customStyles}
                        className="basic-single"
                        defaultValue={repositories[0]}
                        name="repository"
                        options={repositories}
                        getOptionLabel={(option) => option.facility}
                        getOptionValue={(option) => option.facility_code}
                        onChange={repositoryChangeHandler}
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
                    <Select
                        styles={customStyles}
                        className="basic-single"
                        defaultValue={platforms[0]}
                        name="platform"
                        options={platforms}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.name}
                        onChange={platformChangeHandler}
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
                    <Select
                        styles={customStyles}
                        className="basic-single"
                        defaultValue={selectOptions.get('lakes')[0]}
                        name="lake"
                        options={selectOptions.get('lakes')}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.name}
                        onChange={lakeChangeHandler}
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

export default SamplesControlPanel;