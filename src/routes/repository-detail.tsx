import { useParams } from "react-router-dom";
import { useQuery } from 'react-query'
import DOMPurify from 'dompurify'
import { fetchRepositoryById, fetchRepository } from '../geosamples-api'
import './repository-detail.css'


function sanitizeHTML(dirtyHTML:(string|Node)) {
  const clean = DOMPurify.sanitize(dirtyHTML, {USE_PROFILES: {html: true}})
  // const doc = parser.parseFromString(repositoryData.facility_comment, "text/html");
  return(clean);
}


export default function RepositoryDetail() {
  console.log('redrawing RepositoryDetail...')
  const baseClass = 'RepositoryDetail'
  const {repositoryId} = useParams();
  const { data, error, status } = useQuery(["repositoryDetail", {repositoryId}], 
    fetchRepository, {
      // don't retry for 404 errors, try for up to 3 times for anything else
      retry: (failureCount, error) => {
          if (error.statusCode === 404 || failureCount > 3) {
            return false
          } else {
            return true
          }
      }
    }
  );

  return (
    <div className={baseClass}>
        { data ?
        <div>
        <h2 className={`${baseClass}--contactInfoTitle`}>Contact Information for {data.facility}</h2>
        <div className={`${baseClass}--contactInfoDiv`} dangerouslySetInnerHTML={{__html:sanitizeHTML(data.facility_comment)}}/>            
        </div>
        : 
        <div className={`${baseClass}--errorMessage`}><h2>No Data Available</h2></div>
        }
    </div>
  );
}