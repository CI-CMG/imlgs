/* single cruise, identified by cruiseId AND platform */
import { Outlet, useParams } from "react-router-dom";

export default function Cruise() {
  console.log('redrawing Cruise...')
  let params = useParams();
  console.log('inside Cruise with ', params)
  return (
    <>
    <main style={{ padding: "1rem 0" }}>
      <h2>Cruise</h2>
      Id: {params.cruiseId}
      <br/>
      Platform: {params.platformId} 
    </main>
    </>
  );
}