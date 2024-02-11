import './samples.css'
import { useState } from "react"
import { 
  Outlet, 
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  useSubmit,
  useNavigate
} from "react-router-dom"
import FilterPanel from '../../components/filter-panel'
import MapPanel from '../../components/map-panel'
import Header from '../../components/header'


// const notEmpty= /^\S+/


// function getInputElement(id: string): (HTMLInputElement|null) {
//   return document.getElementById(id) as HTMLInputElement
// }


// // perhaps create a series or related functions which check for different expected data types, e.g. string, integer, etc.
// function setInputElementFromSearchParameter(id: string, value: string|null) {
//   // TODO verify that found element is indeed a HTMLInputElement, e.g. check inputElement.tagName?
//   const inputElement = document.getElementById(id) as HTMLInputElement
//   if (!inputElement) { return }

//   // if (inputElement.tagName.toLowerCase() !== 'input') { return }
//   inputElement.value = (value && notEmpty.test(value))? value : '' 
// }


export default function Samples() {
  // console.log('rendering Samples...')
  // const navigation = useNavigation()
  // const submit = useSubmit()
  const [zoomToSelected, setZoomToSelected] = useState<boolean>(true)
  // const [filters, setFilters] = useState<FormData>()

  const baseClass = 'Samples'

  const submit = useSubmit()

  // const url = new URL(window.location.href)
  // console.log('searchParams: ', url.searchParams.toString())
  
  // let q = url.searchParams.get("q")

  // useEffect(() => {
  //   // sync URL search parameters w/ form elements
  //   setInputElementFromSearchParameter('q', url.searchParams.get("q") )
  //   // let inputElement = getInputElement('q')
  //   // if ( inputElement && q ) { inputElement.value = q }
  //   // document.getElementById("q").value = q 
  // }, [q, url])
 
  // const searching =
  //   navigation.location &&
  //   new URLSearchParams(navigation.location.search).has(
  //     "q"
  //   )

  function setFilters(formData: FormData) {
    // console.log('inside submitForm with ', formData)
    submit(formData)
  }


  return (
    <>
    <Header/>
    <div className={`${baseClass}--wrapper`}>
      <div className={`${baseClass}--sidebar`}>

        <FilterPanel 
          zoomToSelected={zoomToSelected} 
          zoomToggleHandler={boolean => setZoomToSelected(boolean)}
          setFilters={setFilters}
        />
        {/* <DepthRange/> */}
      </div>
      <main className={`${baseClass}--main`}>
        <MapPanel zoomToSelected={zoomToSelected}/>
      </main>
    </div>
    </>
    )


    
  //   <div className='Samples--wrapper'>
  //     <h1>SAMPLES PAGE</h1>
  //     <Form 
  //       id="search-form"
  //       role="search"
  //       onChange={(event) => {
  //         // submit(event.currentTarget)
  //         event.preventDefault()
  //       }}
  //     >
  //           <input
  //             id="q"
  //             className={searching ? "loading" : ""}
  //             aria-label="Search contacts"
  //             placeholder="Search"
  //             type="search"
  //             name="q"
  //             defaultValue={q}
  //             onBlur={(event) => {
  //               submit(event.currentTarget.form)
  //             }}
  //             // onChange={(event) => {
  //             //   const isFirstSearch = q == null;
  //             //   submit(event.currentTarget.form, {
  //             //     replace: !isFirstSearch,
  //             //   });
  //             // }}
  //           />
  //       </Form>
  //   </div>

}