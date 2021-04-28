import React, {useEffect, useState} from "react"
import {
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom"
import HeaderPanel from "./HeaderPanel"
import Repository from './Repository'
import FooterPanel from './FooterPanel'
import RepositoriesPanel from "./RepositoriesPanel"
import "./Repositories.css"


function RepositoriesPage() {
    let match = useRouteMatch()
    const pageName = 'Repositories'
    let { repositoryId } = useParams()
    
    return (
        <Switch>
            <Route path={`${match.path}/:repositoryId`}>
                <Repository />
            </Route>
            <Route path={match.path}>
                <>
                    <HeaderPanel pageName={pageName}></HeaderPanel>
                    <RepositoriesPanel></RepositoriesPanel>
                    <FooterPanel></FooterPanel>
                </>
            </Route>
        </Switch>
    )
}

export default RepositoriesPage