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
  const options = [
    {label: 'About the IMLGS', href: 'https://ngdc.noaa.gov/mgg/curator/'},
    {label: 'Developer Documentation (API)', href: 'https://www.ngdc.noaa.gov/geosamples-api/swagger-ui/index.html?configUrl=/geosamples-api/swagger-config.json'}
  ]
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenuItemClick = (href:string) => {
    setAnchorEl(null)
    // replace current window
    window.location.assign(href)
    // open in new tab
    // window.open(href, '_blank')
  }

  return (
    <React.Fragment>
      <Tooltip title="Navigation Menu">  
        <IconButton
          id="basic-button"
          onClick={handleClick}
          size="small"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          {/* <Avatar sx={{ width: 32, height: 32 }}>M</Avatar> */}
          <MenuIcon fontSize="large" htmlColor='white'/>
        </IconButton>
    </Tooltip>
      
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
          {options.map(option => (
          <MenuItem key={option.label} onClick={() => handleMenuItemClick(option.href)}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
}
