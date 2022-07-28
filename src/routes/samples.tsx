import React, {useEffect, useState} from 'react';
import FilterSamples from '../components/filter-samples';
import SamplesCount from '../components/samples-count';
import MapPanel from '../components/map-panel';
import './samples.css'
import DepthRange from '../components/depth-range';


export default function Samples() {
  const baseClass = 'Samples'
  console.log('rendering Samples...')


  // TODO read default extent from URL
  // const [geoextent, setGeoextent] = useState()
  const [zoomToSelected, setZoomToSelected] = useState<boolean>(true)
  
  return (
    <div className={`${baseClass}--wrapper`}>
      <div className={`${baseClass}--sidebar`}>
        <SamplesCount/>
        {/* <DepthRange/> */}
        <FilterSamples
          zoomToSelected={zoomToSelected} 
          zoomToggleHandler={(event:React.ChangeEvent<HTMLInputElement>) => setZoomToSelected(event.target.checked)}
        />
      </div>
      <main className={`${baseClass}--main`}>
        <MapPanel zoomToSelected={zoomToSelected}/>
      </main>
    </div>
    );
}
