import { Outlet, useLoaderData, useSearchParams, useSubmit } from "react-router-dom"
import { getCruisesCount } from "./data"
import { useEffect } from "react"
import CruiseList from "../../components/cruise-list"
import { searchParamsToFilters } from "../../utilities"
import { useQuery } from "@tanstack/react-query"
import InfiniteCruiseList from "../../components/infinite-cruise-list"
import Header from "../../components/header"
import './cruises.css'

const baseClass = 'Cruises'

export default function Cruises() {
  const url = new URL(window.location.href)
  const filters = searchParamsToFilters(url.searchParams)
  const initialData = useLoaderData() as Awaited<number>
  // const { data: cruisesCount } = useQuery({
  //   ...cruiseCountQuery(filters),
  //   initialData
  // })
    
    const { data: cruisesCount } = useQuery({queryKey: ['cruises', 'count', filters.toString()], queryFn: () => getCruisesCount(filters)})

  return (
    <>
    <Header/>
    <div className={`${baseClass}--wrapper`}>
      <div className={`${baseClass}--sidebar`}>
        { cruisesCount ?
          <span style={{fontWeight: 'bold'}}>{cruisesCount} cruises matching criteria</span>
          : ''
        }
        <CruiseFilter filters={filters} />
        { cruisesCount && cruisesCount < 500 ?
          <CruiseList  filters={filters}/>
          :
          <InfiniteCruiseList filters={filters} />
        }
      </div>
      <div className={`${baseClass}--main`}>
        <Outlet/>
      </div>
    </div>
    </>
  )
  
}

export function Index() {
  return (
    <p style={{'paddingLeft': '1rem'}}>
      Please select a Cruise from the left to get its details
    </p>
  );
}

interface Props {
  filters: URLSearchParams
}

export function CruiseFilter({filters}: Props) {
  const url = new URL(window.location.href)
  let [searchParams, setSearchParams] = useSearchParams()

  useEffect (() => {
    const textInput = document.getElementById('cruise-text') as HTMLInputElement
    if (!textInput) { return }
    if (searchParams.get('cruise')) {
      textInput.value = searchParams.get('cruise') as string
    }
  }, [searchParams])

  function onBlurHandler(event:React.FocusEvent<HTMLInputElement>):void {
    event.target.blur()
    if (!event.target.value && !url.searchParams.get(event.target.name)) { return }
    if (event.target.value === url.searchParams.get(event.target.name)) { return }
    const mySearchParams = new URLSearchParams(searchParams)
    mySearchParams.set('cruise', event.target.value)
    // console.log('onBlurHandler: ', mySearchParams.toString())
    setSearchParams(mySearchParams)
    
  }

  function checkForEnterKey(event:React.KeyboardEvent<HTMLInputElement>):void {
    if (event.key === 'Enter') {
      const target = event.target as HTMLInputElement
      target.blur()
    }
  }


  function onChangeHandler(evt: React.ChangeEvent<HTMLInputElement>) {
    if (evt.target.value === '') {
      const mySearchParams = new URLSearchParams(searchParams)
      mySearchParams.delete('cruise')
      setSearchParams(mySearchParams)
    }
  }


  return(
    <div>
      {/* <Form id="search-form" role="search"> */}
      <label htmlFor="cruise-text" style={{'paddingRight':'5px', 'fontSize': 'small'}}>Filter</label>
      <input
        id="cruise-text"
        title='filter cruises starting with specified string'
        aria-label="cruises"
        type="search"
        name="cruise"
        maxLength={24}
        minLength={2}
        size={15}
        autoComplete='off'
        onKeyDown={event => checkForEnterKey(event) }
        onBlur={onBlurHandler}
        onChange={onChangeHandler}
      />
      </div>
  )
}