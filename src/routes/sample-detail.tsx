import { useParams } from "react-router-dom";

export default function SampleDetail() {
    let params = useParams();
    console.log('redrawing SampleDetail with ', params)
  
    return (
      <main style={{ padding: "1rem 0" }}>
        <h2>Sample Detail for {params.sampleId}</h2>
      </main>
    );
  }