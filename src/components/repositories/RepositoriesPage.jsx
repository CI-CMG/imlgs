import React, {useEffect, useState} from "react"
import {
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom"
import HeaderPanel from "../HeaderPanel"
import RepositoryDetail from './RepositoryDetail'
import FooterPanel from '../FooterPanel'
import RepositoriesPanel from "./RepositoriesPanel"
import "./RepositoriesPage.css"


function RepositoriesPage() {
    let match = useRouteMatch()
    const pageName = 'Repositories'
    let { repositoryId } = useParams()
    
    return (
        <Switch>
            <Route path={`${match.path}/:repositoryId`}>
                <div className="RepositoriesPage">
                    <HeaderPanel></HeaderPanel>
                    <RepositoryDetail></RepositoryDetail>
                    <FooterPanel></FooterPanel>
                </div>
            </Route>
            <Route path={match.path}>
                <div className="RepositoriesPage">
                    <HeaderPanel pageName={pageName}></HeaderPanel>
                    <RepositoriesPanel></RepositoriesPanel>
                    <FooterPanel></FooterPanel>
                </div>
            </Route>
        </Switch>
    )
}

export default RepositoriesPage