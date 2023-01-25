import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuIcon from '@mui/icons-material/Menu';


export default function BasicMenu() {
    console.log('rendering BasicMenu...')
    const options = [
        {label: 'About the IMLGS', href: 'https://ngdc.noaa.gov/mgg/curator/'},
        {label: 'Developer Documentation (API)', href: 'https://www.ngdc.noaa.gov/geosamples-api/swagger-ui/index.html?configUrl=/geosamples-api/swagger-config.json'}
    ]
  
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (href) => {
    setAnchorEl(null);
    window.location.assign(href);
  };


  return (
    <div style={{marginRight: "20px", marginTop: "-10px" }}>
      <Tooltip title="Navigation Menu">  
      {/* <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button> */}

      <IconButton
            id="basic-button"
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <MenuIcon fontSize="large" htmlColor='white'/>
        </IconButton>
      </Tooltip>
      
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
          {options.map(option => (
          <MenuItem key={option.label} onClick={(event) => handleMenuItemClick(option.href)}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
