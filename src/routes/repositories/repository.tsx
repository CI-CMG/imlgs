import './repository.css'
import { useLoaderData, useParams } from "react-router-dom"
import { loader as repositoryLoader, repositoryDetailQuery, RepositoryDetail } from "./data"
import DOMPurify from 'dompurify'
import { QueryClient, useQuery } from "@tanstack/react-query"



function sanitizeHTML(dirtyHTML:(string|Node)) {
  const clean = DOMPurify.sanitize(dirtyHTML, {USE_PROFILES: {html: true}})
  // const doc = parser.parseFromString(repositoryData.facility_comment, "text/html");
  return(clean);
}


export default function Repository () {
  const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof repositoryLoader>>>
  const {repositoryId} = useParams()
  if (!repositoryId) {
    throw new Error("Repository Id must be provided")
  }
  // 'repository' property name comes from response of loader function 
  // const { repository } = useLoaderData() as Awaited<ReturnType<typeof repositoryLoader>>
  const { data: repository }: {data: RepositoryDetail} = useQuery({
    ...repositoryDetailQuery(repositoryId), 
    initialData})
  const baseClass = 'RepositoryDetail'
  
  return (
      <div className={baseClass}>
        <h2 className={`${baseClass}--contactInfoTitle`}>Contact Information for {repository.facility}</h2>
        <div className={`${baseClass}--contactInfoDiv`} dangerouslySetInnerHTML={{__html:sanitizeHTML(repository.facility_comment)}}/>            
    </div>
  )
}