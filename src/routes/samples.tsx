import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, Route, Routes, useSearchParams } from "react-router-dom";
import {
  useQuery,
  useQueries,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from 'react-query'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { fetchTotalSampleCount, fetchFilteredSampleCount, fetchAllRepositories, fetchFilteredRepositories, fetchFilteredPlatforms } from '../geosamples-api'
import { extractDefaultFiltersFromUrl } from '../geosamples-utils'
import FilterSamples from '../components/filter-samples';
import SamplesCount from '../components/samples-count';
import './samples.css'


export default function Samples() {
  const baseClass = 'Samples'
  console.log('rendering Samples...')

  return (
    <div className={`${baseClass}--wrapper`}>
      <nav className={`${baseClass}--sidebar`}>
        <SamplesCount/>
        <FilterSamples/>
      </nav>
      <main className={`${baseClass}--main`}>
        <h3>map goes here</h3>
      </main>
    </div>
    );
}