import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Route, Routes, useSearchParams } from "react-router-dom";

export default function FilterSamples() {
    let [searchParams, setSearchParams] = useSearchParams();
    console.log('inside FilterSamples: ', searchParams.toString())


    return(
        <h2>Filter Test</h2>
    )

}