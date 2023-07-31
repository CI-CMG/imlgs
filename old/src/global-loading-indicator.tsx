import { useIsFetching,  useQueryClient, QueryClientProvider } from 'react-query'
 
export default function GlobalLoadingIndicator() {
  const queryClient = useQueryClient()
   const isFetching = useIsFetching()
 
   return isFetching ? (
     <div>Queries are fetching in the background...</div>
   ) : null
 }