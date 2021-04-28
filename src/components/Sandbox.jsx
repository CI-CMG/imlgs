import React, { useRef, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useQueryClient, QueryClient, QueryClientProvider, useQuery } from "react-query"
import "./Sandbox.css"


function Sandbox() {
const { isLoading, isError, data, error, status } = useQuery('repositories', fetchRepositories)
const repositorySelectDomNode = useRef(null)
const [repositories, setRepositories] = useState([])


function repositoryChangeHandler(evt) {
    console.log(evt)
}


function setRepository(e) {
    console.log('inside setRepository with ',e)
}

// const { data, status } = useQuery('repositories', fetchRepositories)
// if (status === "loading") { console.log('loading data...')}

// function fetchRepositories() {
//     return fetch('http://localhost:8080/geosamples-api/repositories?name_only=true')
//         .then(response => response.json())
// }

async function fetchRepositories() {
    console.log('inside fetchRepositories...')
    const response = await fetch('http://localhost:8080/geosamples-api/repositories?name_only=true')
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    // returns promise
    return response.json()
}



useEffect(() => {
    console.log('getting list of repositories...');
    const queryURL = 'http://localhost:8080/geosamples-api/repositories?name_only=true'

    try {
        fetch(queryURL)
            .then(response => response.json())
            .then((data) => {
                setRepositories(data)
            })
    } catch (error) {
        console.error(error);
    } 
}, [])

// run after every refresh?
useEffect(() => {
    console.log("adding option to Select...")
    const element = repositorySelectDomNode.current
    const option = document.createElement("option");
    option.text = "All Repositories";
    element.add(option, 0);
    console.log(repositorySelectDomNode.current.options)
})

return(
<div className="SamplesFilterPanel">
    <Form>
        <Form.Group controlId="RepositorySelect">
            <Form.Label>Repository</Form.Label>
            <Form.Control as="select" onChange={repositoryChangeHandler} ref={repositorySelectDomNode}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </Form.Control>
        </Form.Group>

        <DropdownButton id="repositorySelect1" title="Repository">
            <Dropdown.Item key="ALL" onSelect={(key) => setRepository(key)} eventKey="ALL">All Repositories</Dropdown.Item>
            {console.log(repositories)}
            { repositories.map(item => (
                <Dropdown.Item key={item.facility_code} onSelect={(key) => setRepository(key)} eventKey={item.facility_code}>{item.facility}</Dropdown.Item>
            ))}
        </DropdownButton>
    </Form>

    {status === 'loading' &&
        <span>Loading...</span>
    }

    {status === 'error' &&
        <span>Error: {error.message}</span>
    }
    
    {status === 'success' &&
        <span>Data loaded</span>
    }

    <ul>
     {data && data.map(repository => (
       <li key={repository.facility_code}>{repository.facility}</li>
     ))}
   </ul>
</div>
)

}

export default Sandbox;