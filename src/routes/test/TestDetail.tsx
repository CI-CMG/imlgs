import { Link, Outlet, useLoaderData } from "react-router-dom"
import './TestDetail.css'

const baseClass = 'TestDetail'

export default function TestDetail() {
  return (
    <div className={`${baseClass}--wrapper`}>
        <h1>Detail goes here</h1>
    </div>
  )  
}
