  import { Outlet, Link } from "react-router-dom";
  import {
    useQuery,
    useQueryClient,
    QueryClient,
    QueryClientProvider
  } from 'react-query'
  import { fetchAllRepositories } from '../geosamples-api'
  // import { getRepositories } from "../data";
  import "./repositories.css";
  
  export default function Repositories() {
    console.log('redrawing Repositories...')
    const baseClass = 'Repositories'
    // let repositories = getRepositories();

    const queryClient = useQueryClient()
    const { data:repositories, error, status} = useQuery(["allRepositories"], fetchAllRepositories, {
      staleTime: Infinity
    });

    type Repository = {
      // email_link: string,
      facility: string,
      facility_code: string,
      // facility_comment: string,
      // inst_code: string,
      // url_link: string
    }

    return (
      
      <div className={`${baseClass}--wrapper`}>
        <nav className={`${baseClass}--sidebar`}>
          {repositories ? 
            repositories.map((repository) => (
            <Link
              style={{ display: "block", margin: "1rem 0", color: "#282c34", textDecoration: "none" }}
              to={`/repositories/${repository.facility_code}`}
              key={repository.facility_code}
            >
              {repository.facility}
            </Link>
          )): '' }
        </nav>
        <Outlet/>
      </div>    
    );
  }