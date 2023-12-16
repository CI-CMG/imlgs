import { Link, Outlet, useLoaderData } from "react-router-dom"
import { ReactNode } from 'react'
import './TestSimple.css'
import { green } from "@mui/material/colors"
import Header from "../../components/header"

const baseClass = 'TestSimple'

export default function TestSimple() {
  return (
    <>
    <Header/>
    <div className={`${baseClass}--wrapper`}>
        <div style={{height: '100px'}}>
          <span>simple page</span>
        </div>
        <Parent >
          <Child1>
            <Child3/>
          </Child1>
          <Child2/>
        </Parent>
    </div>
    </>
  )  
}

type Props = {
  children?: ReactNode
}

function Parent({children}:Props) {
  console.log('rendering Parent...')
  return (
    <div style={{border:'1px dashed black'}}>
    <span>Parent</span>
    {children}
    </div>
  )
}

function Child1({children}:Props) {
  console.log('rendering Child1')
  return (
    <div style={{border:'1px dashed black', 'paddingLeft': '20px'}}>
    <span>Child1</span>
    {children}
    </div>
  )
}

function Child2({children}:Props) {
  console.log('rendering Child2')
  return (
    <div style={{border:'1px dashed black', 'paddingLeft': '20px'}}>
    <span>Child2</span>
    {children}
    </div>
  )
}

function Child3({children}:Props) {
  console.log('rendering Child3')
  console.log(window.location.href)
  return (
    <div style={{border:'1px dashed black', 'paddingLeft': '20px'}}>
    <span>Child3</span>
    {children}
    </div>
  )
}