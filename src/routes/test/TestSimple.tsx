import { Link, Outlet, useLoaderData } from "react-router-dom"
import './TestSimple.css'
import { green } from "@mui/material/colors"

const baseClass = 'TestSimple'

export default function TestSimple() {
  return (
    <div className={`${baseClass}--wrapper`}>
        <div style={{backgroundColor: 'green', height: '1000px'}}>
        <span>simple page</span>
        </div>
    </div>
  )  
}
