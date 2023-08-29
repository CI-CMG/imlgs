import './filter-panel.css'
import { useEffect, useRef, useState } from "react"
import { 
  Outlet, 
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  useSubmit
} from "react-router-dom"
import { 
  fetchCruiseNames, 
  fetchDevices, 
  fetchLakes, 
  fetchPlatforms, 
  fetchProvinces, 
  fetchRepositoryNames,
  fetchMetamorphism,
  fetchMineralogies,
  fetchWeathering
} from '../queries'
import { useQueryClient, useQuery, useQueries, UseQueryResult } from "@tanstack/react-query"

const notEmpty= /^\S+/


// perhaps create a series or related functions which check for different expected data types, e.g. string, integer, etc.
function setInputElementFromSearchParameter(id: string, value: string|null) {
  // TODO verify that found element is indeed a HTMLInputElement, e.g. check inputElement.tagName?
  // WARNING: depends on element name == element id
  const inputElement = document.getElementById(id) as HTMLInputElement
  if (!inputElement) { return }
  inputElement.value = (value && notEmpty.test(value))? value : '' 
}


// filter out unsupported and params with empty values
function searchParamsToFilters(searchParams: URLSearchParams): URLSearchParams {
  const filterParams = new URLSearchParams()
  const supportedFilterNames: string[] = [
    'repository',
    'platform',
    'device',
    'cruise',
    'lake',
    'province',
    'igsn',
    'min_depth',
    'max_depth',
    'cruise_year'
  ]
  supportedFilterNames.forEach(name => {
    // value should never get null or empty string but extra statement is to keep TypeScript satisfied
    const value = (searchParams.has(name) && searchParams.get(name)) ? searchParams.get(name) : ''
    if (value) { filterParams.set(name, value)}
  })
  return filterParams
}

export interface Props {
  zoomToSelected: boolean,
  zoomToggleHandler: (checked:boolean) => void
}


export default function FilterPanel(props:Props) {
  console.log('rendering FilterPanel...')
  const {zoomToSelected, zoomToggleHandler} = props
  const baseClass = 'FilterPanel'
  const navigation = useNavigation()

  const queryClient = useQueryClient()
  console.log(queryClient.getDefaultOptions())
  

  const submit = useSubmit()

  const url = new URL(window.location.href)
  const filters = searchParamsToFilters(url.searchParams)
  console.log('all filters: ', filters.toString())
  
  // execute queries used to populate Select components. By convention, list these
  // in the same order the inputs they populate appear on the page
  const results = useQueries({
    queries: [ 
      { queryKey: ['repositories', filters.toString()], queryFn: () => fetchRepositoryNames(filters) },
      { queryKey: ['platforms', filters.toString()], queryFn: () => fetchPlatforms(filters) },
      { queryKey: ['devices', filters.toString()], queryFn: () => fetchDevices(filters) },
      { queryKey: ['cruises', filters.toString()], queryFn: () => fetchCruiseNames(filters) },
      { queryKey: ['lakes', filters.toString()], queryFn: () => fetchLakes(filters) },
      { queryKey: ['provinces', filters.toString()], queryFn: () => fetchProvinces(filters) },
      { queryKey: ['weathering', filters.toString()], queryFn: () => fetchWeathering(filters) },
      { queryKey: ['metamorphism', filters.toString()], queryFn: () => fetchMetamorphism(filters) },
      { queryKey: ['mineralogies', filters.toString()], queryFn: () => fetchMineralogies(filters) },
      // { queryKey: ['lithologies', filters.toString()], queryFn: () => fetchlithologies(filters) },

    ]
  })
  console.log({results})

  useEffect(() => {
    console.log('inside useEffect to sync URL search params with form input elements')
    // sync URL search parameters w/ form elements. Need to explicitly list each search parameter
    setInputElementFromSearchParameter('repository-select', url.searchParams.get("repository") )
    setInputElementFromSearchParameter('platform-select', url.searchParams.get("platform") )
    setInputElementFromSearchParameter('device-select', url.searchParams.get("device") )
    setInputElementFromSearchParameter('cruise-select', url.searchParams.get("cruise") )
    setInputElementFromSearchParameter('lake-select', url.searchParams.get("lake") )
    setInputElementFromSearchParameter('province-select', url.searchParams.get("province") )
    setInputElementFromSearchParameter('igsn-text', url.searchParams.get("igsn") )
    setInputElementFromSearchParameter('min_depth-text', url.searchParams.get("min_depth") )
    setInputElementFromSearchParameter('max_depth-text', url.searchParams.get("max_depth") )
    setInputElementFromSearchParameter('cruise_year-text', url.searchParams.get("cruise_year") )
  }, [url.searchParams])
 

  useEffect(() => {
    console.log('inside useEffect to set initial Select option...')
    const selectNames = [
      'repository-select', 
      'platform-select', 
      'device-select', 
      'cruise-select', 
      'lake-select', 
      'province-select']
      
      selectNames.forEach(name => {
      const element = document.getElementById(name) as HTMLSelectElement
      if (element && element.options.length == 2) {
        element.selectedIndex = 1
      }
    })
  }, [results])


  function submitForm() {
    console.log('inside submitForm...')
    const formData = new FormData()
    
    // build FormData from values of all input elements
    const searchForm = document?.getElementById("search-form") as HTMLFormElement
    for (const element of searchForm.elements) {
      const inputElem = element as HTMLFormElement
      // why is FIELDSET in the HTMLFormControlsCollection?
      if (inputElem.tagName === 'FIELDSET') { continue }
      // TODO check for whitespace only?
      if (inputElem.value !== '') { formData.append(inputElem.name, inputElem.value)}
    }
    submit(formData)
  }


  function checkForEnterKey(event:React.KeyboardEvent<HTMLInputElement>):void {
    if (event.key === 'Enter') {
      const target = event.target as HTMLInputElement
      target.blur()
    }
  }


  // used for text input element
  function onBlurHandler(event:React.FocusEvent<HTMLInputElement>):void {
    console.log('inside onBlurHandler with ', event)
    event.target.blur()
    // no need to submit form if input didn't change
    if (!event.target.value && !url.searchParams.get(event.target.name)) { return }
    if (event.target.value === url.searchParams.get(event.target.name)) { return }
    submitForm()
  }


  // used for select input elements
  function onChangeHandler(event: React.ChangeEvent<HTMLSelectElement>) {
    console.log(`inside onChangeHandler: ${event.target.name} changed to ${event.target.value}...`)
    submitForm()
  }


  function resetButtonHandler(event: React.MouseEvent<HTMLButtonElement>) {
    // console.log('reset button clicked: ', event)
    const onlyInputs = document.querySelectorAll('#search-form input') as NodeListOf<HTMLInputElement>
    onlyInputs.forEach(input => {
      input.value = ''
    })
    const onlySelects = document.querySelectorAll('#search-form select') as NodeListOf<HTMLSelectElement>
    onlySelects.forEach(input => {
      input.value = ''
    })
    submitForm()
  }


  function formatCruiseSelect(data: string[]) {
    if (data && data.length > 0 && data.length < 500) {
      return (
      <select name="cruise" id='cruise-select' onChange={onChangeHandler} style={{'width':'80%'}}>
        <option value="">-- cruise --</option>
        {
          data?.map((name, idx) => <option value={name} key={idx}>{name}</option>)
        }
      </select>)
    } else if (data?.length === 0) {
      return (
        <select
          name="cruise" 
          id='cruise-select'
          disabled
          style={{'width':'80%'}} 
          title="No cruises with this combination of filters">
        <option value="">-- cruise --</option>
      </select>
        // <p style={{'fontSize': 'x-small', 'textAlign':'center'}}>No cruises with this combination of filters.</p>
      )
    } else if (data?.length >= 500) {
      return (
        <select
          name="cruise" 
          id='cruise-select'
          disabled
          style={{'width':'80%'}} 
          title="Too many cruises to display. Please select an additional filter(s) first">
        <option value="">-- cruise --</option>
      </select>
        // <p style={{'fontSize': 'x-small', 'textAlign':'center'}}>Too many cruises to display. Please select additional filter(s)</p>
      )
    }
  }


  return (
    <div className={baseClass}>
      <Form
        id="search-form"
        role="search"
      >
        <div style={{'paddingTop': '10px','textAlign': 'center'}}>
          { results[0].data && results[0].data.length ? 
          <select
            name="repository"
            title="filter samples by repository"
            id='repository-select' 
            onChange={onChangeHandler} 
            style={{'width':'80%'}}
          >
            <option value="">-- repository --</option>
            {
              results[0].data?.map(name => <option value={name} key={name}>{name}</option>)
            }
          </select>
          :
          <select
            name="repository"
            title="No repositories with this combination of filters"
            id='repository-select' 
            disabled
            style={{'width':'80%'}}
          >
            <option value="">-- repository --</option>
          </select>
          }
        </div>

        <div style={{'paddingTop': '10px','textAlign': 'center'}}>
        { results[1].data && results[1].data?.length ? 
          <select name="platform" id='platform-select' onChange={onChangeHandler} style={{'width':'80%'}}>
            <option value="">-- platform --</option>
            {
              results[1].data?.map(name => <option value={name} key={name}>{name}</option>)
            }
          </select>
          :
          <select 
            name="platform" 
            id='platform-select'
            title="no platforms with this combination of filters"
            disabled
            style={{'width':'80%'}}
          >
            <option value="">-- platform --</option>
          </select>
        }          
        </div>

        <div style={{'paddingTop': '10px','textAlign': 'center'}}>
        { results[2].data && results[2].data?.length ? 
          <select name="device" id='device-select' onChange={onChangeHandler} style={{'width':'80%'}}>
            <option value="">-- device --</option>
            {
              results[2].data?.map(name => <option value={name} key={name}>{name}</option>)
            }
          </select>
          :
          <select 
            name="device" 
            id='device-select'
            title="no devices with this combination of filters"
            disabled
            style={{'width':'80%'}}
          >
          <option value="">-- device --</option>
        </select>
      }   
        </div>
        <div style={{'paddingTop': '10px','textAlign': 'center'}}>
        { results[3].data ?  formatCruiseSelect(results[3].data) : '' }
        </div>
        <div style={{'paddingTop': '10px','textAlign': 'center'}}>
        { results[4].data && results[4].data?.length ? 
          <select name="lake" id='lake-select' onChange={onChangeHandler} style={{'width':'80%'}}>
            <option value="">-- lake --</option>
            {
              results[4].data?.map(name => <option value={name} key={name}>{name}</option>)
            }
          </select>
          :
          <select 
            name="lake" 
            id='lake-select'
            title='no lakes with this combination of filters'
            disabled
            style={{'width':'80%'}}>
            <option value="">-- lake --</option>
          </select>
        }   
        </div>

        <div style={{'paddingTop': '10px','textAlign': 'center'}}>
        { results[5].data && results[5].data?.length ? 
          <select name="province" id='province-select' onChange={onChangeHandler} style={{'width':'80%'}}>
            <option value="">-- province --</option>
            {
              results[5].data?.map(name => <option value={name} key={name}>{name}</option>)
            }          
            </select>
            :
            <select 
              name="province" 
              id='province-select'
              title='no physiographic provinces with this combination of filters'
              disabled
              style={{'width':'80%'}}
            >
              <option value="">-- province --</option>
            </select>
        }   
        </div>

        
        <div style={{'display': 'flex', 'alignItems': 'center', 'justifyContent': 'space-around', 'paddingTop': '10px'}}>
          <div>
          <label htmlFor="igsn-text" style={{'paddingRight':'5px', 'fontSize': 'small'}}>IGSN</label>
          <input
            id="igsn-text"
            aria-label="IGSN"
            type="search"
            name="igsn"
            maxLength={9}
            minLength={9}
            size={12}
            autoComplete='off'
            onKeyDown={event => checkForEnterKey(event) }
            onBlur={onBlurHandler}
          />
          </div>
          <div>
            <label htmlFor="cruise_year-text" style={{'paddingRight':'5px', 'fontSize': 'small'}}>Cruise Year</label>
            <input
              id="cruise_year-text"
              aria-label="cruise year"
              type="search"
              name="cruise_year"
              maxLength={4}
              minLength={4}
              size={6}
              autoComplete='off'
              onKeyDown={event => checkForEnterKey(event) }
              onBlur={onBlurHandler}
            />
          </div>
        </div>

        <div style={{'paddingLeft': '10px', 'paddingRight': '10px', 'marginTop': '10px'}}>
          <fieldset style={{'display': 'flex', 'alignItems': 'center', 'justifyContent': 'space-around'}}>
            <legend style={{'fontSize': 'small'}}>Depth</legend>
            <input
              id="min_depth-text"
              aria-label="min depth"
              placeholder="min"
              type="search"
              name="min_depth"
              maxLength={6}
              minLength={6}
              size={10}
              onKeyDown={event => checkForEnterKey(event) }
              onBlur={onBlurHandler}
            />
            <input
              id="max_depth-text"
              aria-label="max depth"
              placeholder="max"
              type="search"
              name="max_depth"
              maxLength={6}
              minLength={6}
              size={10}
              onKeyDown={event => checkForEnterKey(event) }
              onBlur={onBlurHandler}
            />
        </fieldset>
        </div>

        <div style={{'paddingLeft': '10px', 'paddingRight': '10px', 'marginTop': '10px'}}>
          <fieldset>
            <legend>Core Sample Attributes</legend>
            <select name="lithology" id='lithology-select' onChange={onChangeHandler} style={{'width':'80%'}}>
              <option value="">-- Lithology --</option>
            </select>
            <select name="texture" id='texture-select' onChange={onChangeHandler} style={{'width':'80%'}}>
              <option value="">-- Texture --</option>
            </select>
            <select name="mineralogy" id='mineralogy-select' onChange={onChangeHandler} style={{'width':'80%'}}>
              <option value="">-- Mineralogy --</option>
              {
                results[8].data?.map(name => <option value={name} key={name}>{name}</option>)
              }          

            </select>
            <select name="weathering" id='weathering-select' onChange={onChangeHandler} style={{'width':'80%'}}>
              <option value="">-- Weathering --</option>
              {
                results[6].data?.map(name => <option value={name} key={name}>{name}</option>)
              }          

            </select>
            <select name="metamorphism" id='metamorphism-select' onChange={onChangeHandler} style={{'width':'80%'}}>
              <option value="">-- Metamorphism --</option>
              {
                results[7].data?.map(name => <option value={name} key={name}>{name}</option>)
              }          

            </select>

          </fieldset>
        </div>
        
        </Form>
        <div style={{'marginTop':'10px'}}>
          <label>
            Zoom to Selected
            <input type="checkbox" id="zoom-checkbox" name="zoomToSelected" checked={zoomToSelected}  
             onChange={(event:React.ChangeEvent<HTMLInputElement>) => zoomToggleHandler(event.target.checked)}/>
          </label> 
        </div>

        <div style={{'display': 'flex', 'alignItems': 'center', 'justifyContent': 'space-around', 'marginTop': '15px'}}>
          <button id='resetButton' type='button' className='styled' onClick={resetButtonHandler}>Reset</button>
        </div>
    </div>
  )
}