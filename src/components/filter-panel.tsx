import './filter-panel.css'
import { Form } from "react-router-dom"
import { 
  fetchDevices, 
  fetchLakes, 
  fetchPlatforms, 
  fetchProvinces, 
  fetchMetamorphism,
  fetchMineralogies,
  fetchWeathering,
  fetchRockLithologies,
  fetchLithologicCompositions,
  fetchGeologicAges,
  fetchRemarks,
  fetchTextures
} from '../queries'
import { getRepositories } from '../routes/repositories/data'
import { CruiseName, getFirstPageOfCruises } from '../routes/cruises/data'
import { useQueries } from "@tanstack/react-query"
import SamplesCount from './samples-count';

const routerBasename = import.meta.env.VITE_routerBasename

export interface Props {
  filters: URLSearchParams,
  zoomToSelected: boolean,
  zoomToggleHandler: (checked:boolean) => void,
  setFilters: (searchParams:URLSearchParams) => void
}


export default function FilterPanel(props:Props) {
  const {zoomToSelected, zoomToggleHandler, setFilters, filters} = props
  const baseClass = 'FilterPanel'

  // create a copy of filter parameters passed into component. This copy is
  // updated by the onChange handlers and passed back to the parent
  let searchParams = new URLSearchParams(filters)

  // execute queries used to populate Select components
  const results = useQueries({
    queries: [ 
      { queryKey: ['repositories', filters.toString()], queryFn: () => getRepositories(filters) },          // 0
      { queryKey: ['platforms', filters.toString()], queryFn: () => fetchPlatforms(filters) },              // 1
      { queryKey: ['devices', filters.toString()], queryFn: () => fetchDevices(filters) },                  // 2
      { queryKey: ['cruise names', filters.toString()], queryFn: () => getFirstPageOfCruises(filters) },    // 3
      { queryKey: ['lakes', filters.toString()], queryFn: () => fetchLakes(filters) },                      // 4
      { queryKey: ['provinces', filters.toString()], queryFn: () => fetchProvinces(filters) },              // 5
      { queryKey: ['weathering', filters.toString()], queryFn: () => fetchWeathering(filters) },            // 6
      { queryKey: ['metamorphism', filters.toString()], queryFn: () => fetchMetamorphism(filters) },        // 7
      { queryKey: ['mineralogies', filters.toString()], queryFn: () => fetchMineralogies(filters) },        // 8
      { queryKey: ['lithologic_compositions', filters.toString()], queryFn: () => fetchLithologicCompositions(filters) }, // 9
      { queryKey: ['textures', filters.toString()], queryFn: () => fetchTextures(filters) },                // 10
      { queryKey: ['rock_lithologies', filters.toString()], queryFn: () => fetchRockLithologies(filters) }, // 11
      { queryKey: ['remarks', filters.toString()], queryFn: () => fetchRemarks(filters) },                  // 12
      { queryKey: ['geologic_ages', filters.toString()], queryFn: () => fetchGeologicAges(filters) }       // 13
    ]
  })

  // track which selects have >0 options (i.e. query results) and should be enabled
  const enabledSelects = results.map(result => {
    return result.data ? result.data.length > 0 : false
  })
  // special handling for cruise since it can be disabled for too few or too many options
  enabledSelects[3] = results[3].data && results[3].data.length > 0 && results[3].data.length < 500 ? true : false


  // doesn't actually directly submit Form but calls method on parent
  function submitForm() {
    setFilters(searchParams)
  }


  function checkForEnterKey(event:React.KeyboardEvent<HTMLInputElement>):void {
    if (event.key === 'Enter') {
      const target = event.target as HTMLInputElement
      target.blur()
    }
  }


  // used for text input element
  function onBlurHandler(event:React.FocusEvent<HTMLInputElement>):void {
    event.target.blur()
    /*
    // WIP
    // ignore any invalid inputs. primarily for text entry widgets to avoid a lot of unnecessary API requests
    if (!event.target.validity.valid) {
      return
    }
    if (event.target.value) {
      searchParams.set(event.target.name, event.target.value)
    } else {
      searchParams.delete(event.target.name)
    }
    */
    // no need to submit form if input didn't change
    if (!event.target.value && !searchParams.get(event.target.name)) { return }
    if (event.target.value === searchParams.get(event.target.name)) { return }
    submitForm()
  }

  function textInputOnChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(`inside textInputOnChangeHandler. ${event.target.name} validity is ${event.target.validity.valid}`)
  }

  // used for select input elements
  function onChangeHandler(event: React.ChangeEvent<HTMLSelectElement|HTMLInputElement>) {
    if (event.target.value) {
      searchParams.set(event.target.name, event.target.value)
    } else {
      searchParams.delete(event.target.name)
    }
    submitForm()
  }


  function resetButtonHandler(event: React.MouseEvent<HTMLButtonElement>) {
    searchParams = new URLSearchParams()
    submitForm()
  }


  function tableButtonHandler() {
    const tableSearchParams = new URLSearchParams(filters)
    // default sort parameters
    tableSearchParams.set('order', 'facility_code:asc')
    tableSearchParams.append('order', 'platform:asc')
    tableSearchParams.append('order', 'cruise:asc')
    tableSearchParams.append('order', 'sample:asc')
    // navigate(`/samples/table?${filters.toString()}`)
    const urlPath = routerBasename ? routerBasename : '/'
    window.open(`${urlPath}samples/table?${tableSearchParams.toString()}`, '_blank')
  }

  return (
    <div className={baseClass}>
      <div className='center-content'>
        <SamplesCount/>
      </div>

      <Form id="search-form" role="search">
        <div className='selectContainer'>
          <select
            name="repository"
            id='repository-select'
            title={enabledSelects[0] ? "filter samples by repository" : "no repositories with this combination of filters"}
            disabled={!enabledSelects[0]}
            onChange={onChangeHandler} 
            style={{'width':'80%'}}
            value={searchParams.has('repository')? searchParams.get('repository') as string: ''}
          >
            <option value="">-- Repository --</option>
            {
              results[0].data?.map(repository => <option value={repository.facility_code} key={repository.id}>{repository.facility}</option>)
            }
          </select>
        </div>

        <div className='selectContainer'>
          <select 
            name="platform" 
            id='platform-select'
            title={enabledSelects[1] ? "filter samples by platform name" : "no platforms with this combination of filters"}
            disabled={!enabledSelects[1]}
            onChange={onChangeHandler} 
            style={{'width':'80%'}}
            value={searchParams.has('platform')? searchParams.get('platform') as string: ''}
          >
            <option value="">-- Platform --</option>
            {
              results[1].data?.map(name => <option value={name} key={name}>{name}</option>)
            }
          </select>
        </div>

        <div className='selectContainer'>
          <select 
            name="device" 
            id='device-select'
            title={enabledSelects[2] ? "filter samples by device type" : "no devices with this combination of filters"}
            disabled={!enabledSelects[2]}
            onChange={onChangeHandler} 
            style={{'width':'80%'}}
            value={searchParams.has('device')? searchParams.get('device') as string: ''}
          >
            <option value="">-- Device --</option>
            {
              results[2].data?.map(name => <option value={name} key={name}>{name}</option>)
            }
          </select>
        </div>
        
        <div className='selectContainer'>
          <select
            name="cruise_id" 
            id='cruise-select'
            title={enabledSelects[3] ? "filter samples by cruise Id" : "either too few or too many cruises with this combination of filters"}
            disabled={!enabledSelects[3]}
            onChange={onChangeHandler} 
            style={{'width':'80%'}}
            value={searchParams.has('cruise_id')? searchParams.get('cruise_id') as string: ''}
          >
            <option value="">-- Cruise --</option>
              {
                results[3].data?.map(cruise => <option value={cruise.id} key={cruise.id}>{cruise.cruise}</option>)
              }
          </select>
        </div>
        
        <div className='selectContainer'>
          <select 
            name="lake"
            id='lake-select'
            title={enabledSelects[4] ? "filter samples by lake" : "no lakes with this combination of filters"}
            disabled={!enabledSelects[4]}
            onChange={onChangeHandler}
            style={{'width':'80%'}}
            value={searchParams.has('repository')? searchParams.get('repository') as string: ''}
            >
            <option value="">-- Lake --</option>
            {
              results[4].data?.map(name => <option value={name} key={name}>{name}</option>)
            }
          </select>
        </div>
        <div style={{'paddingTop': '10px','paddingLeft': '35px'}}>
          <label htmlFor="igsn-text" style={{'paddingRight':'5px', 'fontSize': 'small'}}>IGSN</label>
          <input
            id="igsn-text"
            title='filter samples by IGSN'
            aria-label="IGSN"
            type="search"
            name="igsn"
            maxLength={32}
            minLength={9}
            size={35}
            autoComplete='off'
            onKeyDown={event => checkForEnterKey(event) }
            onBlur={onBlurHandler}
            onChange={onChangeHandler}
            value={searchParams.has('igsn')? searchParams.get('igsn') as string: ''}
          />
        </div>
        <div style={{'paddingTop': '10px', 'paddingLeft': '35px'}}>
          <label htmlFor="start_date_begins_with-text" style={{'paddingRight':'5px', 'fontSize': 'small'}}>Date</label>
          <input
            id="start_date_begins_with-text"
            title='filter samples by date string'
            aria-label="start date"
            aria-describedby="startDateFormat"
            placeholder='YYYYMMDD'
            type="search"
            name="start_date_begins_with"
            maxLength={8}
            minLength={4}
            size={13}
            pattern="\d{1,6}"
            autoComplete='off'
            onKeyDown={event => checkForEnterKey(event) }
            onBlur={onBlurHandler}
            onChange={onChangeHandler}
            value={searchParams.has('start_date_begins_with')? searchParams.get('start_date_begins_with') as string: ''}
          />
          <span id="startDateFormat" className="sr-only">Enter date in YYYYMMDD format</span>

        </div>
        <div style={{'paddingLeft': '10px', 'paddingRight': '10px', 'marginTop': '10px'}}>
          <fieldset style={{'display': 'flex', 'alignItems': 'center', 'justifyContent': 'space-around'}}>
            <legend style={{'fontSize': 'small'}}>Water Depth (m)</legend>
            <input
              id="min_depth-text"
              aria-label="min depth in meters"
              title='filter samples taken from water >= this depth'
              placeholder="min"
              name="min_depth"
              type="search"
              maxLength={6}
              minLength={1}
              size={10}
              pattern="\d{1,6}"
              onKeyDown={event => checkForEnterKey(event) }
              onBlur={onBlurHandler}
              onChange={onChangeHandler}
              value={searchParams.has('min_depth')? searchParams.get('min_depth') as string: ''}
            />
            <input
              id="max_depth-text"
              aria-label="max depth in meters"
              title='filter samples taken from water <= this depth'
              placeholder="max"
              type="search"
              name="max_depth"
              maxLength={6}
              minLength={1}
              size={10}
              pattern="\d{1,6}"
              onKeyDown={event => checkForEnterKey(event) }
              onBlur={onBlurHandler}
              onChange={onChangeHandler}
              value={searchParams.has('max_depth')? searchParams.get('max_depth') as string: ''}
            />
        </fieldset>
        </div>
        {/* <button id="helpBtn">?</button> */}
        <div  style={{'textAlign': 'center', 'paddingLeft': '10px', 'paddingRight': '10px', 'marginTop': '10px'}}>
          <fieldset>
            <legend>Sample Attributes</legend>
            <select
              name="lithologic_composition"
              title={enabledSelects[9] ? "filter samples by lithologic composition" : "no lithologic composition values with this combination of filters"}
              disabled={!enabledSelects[9]}
              id='lithologic_composition-select' 
              onChange={onChangeHandler} 
              style={{'width':'90%'}}
              value={searchParams.has('lithologic_composition')? searchParams.get('lithologic_composition') as string: ''}
            >
              <option value="">-- Lithologic Composition --</option>
              {
                results[9].data?.map(name => <option value={name} key={name}>{name}</option>)
              }     
            </select>
            <select 
              name="texture" 
              title={enabledSelects[10] ? "filter samples by texture" : "no texture values with this combination of filters"}
              id='texture-select'
              disabled={!enabledSelects[10]}
              onChange={onChangeHandler} 
              style={{'width':'90%'}}
              value={searchParams.has('texture')? searchParams.get('texture') as string: ''}
            >
              <option value="">-- Texture --</option>
              {
                results[10].data?.map(name => <option value={name} key={name}>{name}</option>)
              }     
            </select>
            <select 
              name="mineralogy" 
              title={enabledSelects[8] ? "filter samples by rock mineralogy" : "no rock mineralogy values with this combination of filters"}
              disabled={!enabledSelects[8]}
              id='mineralogy-select' 
              onChange={onChangeHandler} 
              style={{'width':'90%'}}
              value={searchParams.has('mineralogy')? searchParams.get('mineralogy') as string: ''}
            >
              <option value="">-- Rock Mineralogy --</option>
              {
                results[8].data?.map(name => <option value={name} key={name}>{name}</option>)
              }          
            </select>
            <select 
              name="weathering" 
              id='weathering-select'
              title={enabledSelects[6] ? "filter samples by rock weathering" : "no weathering values with this combination of filters"}
              disabled={!enabledSelects[6]}
              onChange={onChangeHandler} 
              style={{'width':'90%'}}
              value={searchParams.has('weathering')? searchParams.get('weathering') as string: ''}
            >
              <option value="">-- Rock Weathering --</option>
              {
                results[6].data?.map(name => <option value={name} key={name}>{name}</option>)
              }          
            </select>
            <select 
              name="metamorphism"
              title={enabledSelects[7] ? "filter samples by rock metamorphism" : "no rock metamorphism values with this combination of filters"}
              disabled={!enabledSelects[7]}
              id='metamorphism-select' 
              onChange={onChangeHandler} 
              style={{'width':'90%'}}
              value={searchParams.has('metamorphism')? searchParams.get('metamorphism') as string: ''}
            >
              <option value="">-- Rock Metamorphism --</option>
              {
                results[7].data?.map(name => <option value={name} key={name}>{name}</option>)
              }          
            </select>
            <select 
              name="age" 
              id='geologic_age-select'
              title={enabledSelects[13] ? "filter samples by geologic age" : "no geologic age values with this combination of filters"}
              disabled={!enabledSelects[13]}
              onChange={onChangeHandler}
              style={{'width':'90%'}}
              value={searchParams.has('age')? searchParams.get('age') as string: ''}
            >
              <option value="">-- Geologic Age --</option>
              {
                results[13].data?.map(name => <option value={name} key={name}>{name}</option>)
              }          
            </select>
            <select 
              name="rock_lithology" 
              id='rock_lithology-select'
              title={enabledSelects[11] ? "filter samples by rock lithology" : "no rock lithology values with this combination of filters"}
              disabled={!enabledSelects[11]}
              onChange={onChangeHandler} 
              style={{'width':'90%'}}
              value={searchParams.has('rock_lithology')? searchParams.get('rock_lithology') as string: ''}
            >
              <option value="">-- Rock Lithology --</option>
              {
                results[11].data?.map(name => <option value={name} key={name}>{name}</option>)
              }          
            </select>
            <select 
              name="remark" 
              id='remark-select'
              title={enabledSelects[12] ? "filter samples by rock glass remarks" : "no rock glass remarks with this combination of filters"}
              disabled={!enabledSelects[12]}
              onChange={onChangeHandler} 
              style={{'width':'90%'}}
              value={searchParams.has('remark')? searchParams.get('remark') as string: ''}
            >
              <option value="">-- Rock Glass Remarks & Mn/Fe Oxide --</option>
              {
                results[12].data?.map(name => <option value={name} key={name}>{name}</option>)
              }          
            </select>
          </fieldset>
        </div>
        
        </Form>
        <div className='center-content' style={{'marginTop':'10px'}}>
          <label>
            Zoom to Selected
            <input type="checkbox" id="zoom-checkbox" name="zoomToSelected" checked={zoomToSelected}  
             onChange={(event:React.ChangeEvent<HTMLInputElement>) => zoomToggleHandler(event.target.checked)}/>
          </label> 
        </div>

        <div className='center-content' style={{'marginTop': '25px'}}>
          <button id='resetButton' type='button'  onClick={resetButtonHandler}
            title="reset the filters to default values"
            aria-label="reset the filters to default values"
          >Reset</button>
          <button id='tableButton' type='button' onClick={tableButtonHandler}
            title="open a tabular view of the IMLGS data shown on the map"
            aria-label="open a tabular view of the IMLGS data shown on the map"
          >Table View</button>
        </div>

    </div>
  )
}