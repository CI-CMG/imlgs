import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { ClickAwayListener } from '@mui/base/ClickAwayListener'


export default function BasicMenu() {
  const options = [
    {label: 'About the IMLGS', href: 'https://www.ncei.noaa.gov/products/index-marine-lacustrine-samples'},
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
      <div>
      {/* <ClickAwayListener onClickAway={handleClose}> */}
      <Tooltip title="Navigation Menu"> 
        <IconButton
          id="basic-button"
          onClick={handleClick}
          size="small"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <MenuIcon fontSize="large" htmlColor='white'/>
        </IconButton>
    </Tooltip>
        {/* </ClickAwayListener> */}
      
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
          {options.map(option => (
          <MenuItem key={option.label} onClick={() => handleMenuItemClick(option.href)}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
      </div>
    </React.Fragment>
  );
}
