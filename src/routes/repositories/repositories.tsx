import { Link, Outlet, useLoaderData } from "react-router-dom"
import { repositoriesLoader } from "./data"
import Header from "../../components/header"

import './repositories.css'

const baseClass = 'Repositories'

export default function Repositories() {
  const { repositories } = useLoaderData() as Awaited<ReturnType<typeof repositoriesLoader>>
  // console.log(`${repositories.length} repositories loaded`)

  return (
    <>
    <Header/>
    <div className={`${baseClass}--wrapper`}>
      <div className={`${baseClass}--sidebar`}>
        {repositories ? 
            repositories.map((repository) => (
            <Link
              style={{ display: "block", margin: "1rem 0", textDecoration: "none" }}
              to={`/repositories/${repository.id}`}
              key={repository.id}
              title={`details for cruise ${repository.id}`} 
              aria-label={`details for cruise ${repository.id}`}
            >
              {repository.facility}
            </Link>
          )): '' }
      </div>
      <div className={`${baseClass}--main`}>
        <Outlet/>
      </div>
    </div>
    </>
  
  )
  
}

export function Index() {
  return (
    <p style={{'paddingLeft': '1rem'}}>
      Please select a Repository from the left to get its details
    </p>
  );
}