import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/root'
import ErrorPage, {PageNotFound} from './routes/error-page'
import Repositories, { Index as RepositoriesIndex } from './routes/repositories/repositories'
import { loader as repositoryLoader, repositoriesLoader } from './routes/repositories/data'
import Repository from './routes/repositories/repository'
import Cruises, { Index as CruisesIndex } from './routes/cruises/cruises'
import { loader as cruiseLoader, cruisesLoader } from './routes/cruises/data'
import Cruise from './routes/cruises/cruise'
import Samples from './routes/samples/samples'
import SampleDetail from './routes/sample/sample'
import { loader as sampleLoader } from './routes/sample/data'
import { loader as samplesLoader } from './routes/table/data'
import SamplesTable from './routes/table/table'
import LayoutTest from './routes/test/LayoutTest'
import { Index as TestIndex } from './routes/test/LayoutTest'
import TestDetail from './routes/test/TestDetail'
import TestSimple from './routes/test/TestSimple'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 1000 * 10,
      staleTime: Infinity
    },
  },
})

const routerBasename = import.meta.env.VITE_routerBasename
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />,
    // loader: rootLoader,
    children: [
      // default to the Samples page
      // { index: true, element: <Samples/>},
      {
        path: "samples",
        element: <Samples/>
      },
      {
        path: "samples/table",
        element: <SamplesTable/>,
        loader: samplesLoader(queryClient)
      },
      {
        path: "samples/:id",
        element: <SampleDetail/>,
        loader: sampleLoader(queryClient)
      },
      {
        path: "repositories",
        element: <Repositories/>,
        loader: repositoriesLoader,
        children: [
          { index: true, element: <RepositoriesIndex /> },
          {
            path: ":repositoryId",
            element: <Repository/>,
            loader: repositoryLoader(queryClient),
          },
        ]
      },
      {
        path: "cruises",
        element: <Cruises/>,
        // loader: cruisesLoader(queryClient),
        // loader: cruisesLoader,
        children: [
          { index: true, element: <CruisesIndex /> },
          {
            path: ":cruiseId",
            element: <Cruise/>,
            loader: cruiseLoader(queryClient),
          },
        ]
      },
      {
        path: "test",
        element: <LayoutTest/>,
        children: [
          { index: true, element: <TestIndex /> },
          {
            path: ":id",
            element: <TestDetail/>
          }
        ]
      },
      {
        path: "test2",
        element: <TestSimple/>,
      },
      {
        // different way to default to /samples which changes the URL
        path: "",
        element: <Navigate to="/samples"/>
      },
      {
        path: "*",
        element: <PageNotFound/>,
        errorElement: <ErrorPage />
      }
    ]
  }
], { basename: routerBasename }
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
        <ReactQueryDevtools position="bottom-right" />
      </QueryClientProvider>
  </React.StrictMode>,
)
