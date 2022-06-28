import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from 'react-query'
import { fetchTotalSampleCount } from '../geosamples-api'

export default function SamplesTable() {
    console.log('redrawing SamplesTable...')
  
    const queryClient = useQueryClient()
    //TODO
    const { data, error, status} = useQuery("totalSampleCount", fetchTotalSampleCount);
  
    return (
      <main style={{ padding: "1rem 0" }}>
        <h2>Samples Table</h2>
      </main>
    );
  }
