/*
 * basic layout for all pages in webapp, essentially a fixed header and footer
 with responsive main area for content
 */
import { Outlet } from "react-router-dom"
import Header from '../components/header'
import Footer from '../components/footer'
import './root.css'


export default function Root() {
  return (
    <div className="Root--wrapper">
      <Header />
      <Outlet/>
      <Footer />
    </div>
  )
}