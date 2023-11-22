import { Link, Outlet, useLoaderData } from "react-router-dom"
import './LayoutTest.css'

const baseClass = 'LayoutTest'

export default function LayoutTest() {
  return (
    <div className={`${baseClass}--wrapper`}>
      <div className={`${baseClass}--sidebar`}>
      </div>
      <div className={`${baseClass}--main`}>
        <Outlet/>
      </div>
    </div>
  )  
}

export function Index() {
  return (
    <p style={{'paddingLeft': '1rem'}}>
      Detail goes here
    </p>
  );
}