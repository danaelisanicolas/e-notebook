import React, {useEffect, useState} from 'react'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { makeStyles } from '@material-ui/core/styles';

import AccountCircle from '@material-ui/icons/AccountCircle'

const EBNavBar = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const useStyles = makeStyles((theme) => ({
    bar: {
      height: '80px',
    },
    brand: {
      flexGrow: 1,
      margin: 'revert',
    },
    navItem: {
      display: 'flex',
      padding: 'auto',
    },
    navItemBox: {
      padding: '0 4px',
      margin: 'auto',
    },
    menuList: {
      justifyContent: 'flex-end',
    }
  }))

  useEffect(() => {
    const loggedOutLinks = document.querySelectorAll('#logout-link')
    const loggedInLinks = document.querySelectorAll('#login-link')

    if (props.user) {
      loggedOutLinks.forEach(item => item.style.display = 'none')
      loggedInLinks.forEach(item => item.style.display = 'flex')
    } else {
      loggedOutLinks.forEach(item => item.style.display = 'flex')
      loggedInLinks.forEach(item => item.style.display = 'none')
    }

  }, [props.user])

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (e) => {
    if (e.target.id === 'logout-menu') {
      props.signout()
    } else {

    }
    setAnchorEl(null);
  };

  const classes = useStyles()

  const openModalHandler = (e) => {
    if (e === 'login-navbar') {
      props.login()
    } else {
      props.signup()
    }
  }

  return(
    <AppBar className={classes.bar} position="static">
      <Toolbar variant='dense'>
        <Typography className={classes.brand} variant="h4" color="inherit" align='left'>
          E-Notebook
        </Typography>
        <ul className={classes.navItem}>
          <Box className={classes.navItemBox}>
            <Button color="inherit">
              Home
            </Button>
          </Box>
          <Box className={classes.navItemBox}>
            <Button color="inherit">
              About
            </Button>
          </Box>
          <Box className={classes.navItemBox}>
            <Button id='logout-link' onClick={() => openModalHandler('login-navbar')} color="inherit">
              Log in
            </Button>
          </Box>
          <Box className={classes.navItemBox}>
            <Button id='logout-link' onClick={() => openModalHandler('signup-navbar')} color="inherit">
              Sign up
            </Button>
          </Box>
          <Box className={classes.navItemBox}>
            <Button id='login-link' color="inherit">
              <IconButton color="inherit" onClick={handleMenu}>
                <AccountCircle />
              </IconButton>
              <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: -44,
                    horizontal: 78,
                  }}
                  open={menuOpen}
                  onClose={handleMenuClose}
                >
                  <MenuItem id='account-menu' className={classes.menuList} onClick={handleMenuClose}>My Account</MenuItem>
                  <MenuItem id='logout-menu' className={classes.menuList} onClick={handleMenuClose}>Log out</MenuItem>
                </Menu>
            </Button>
          </Box>
        </ul>
      </Toolbar>
    </AppBar>
  )
}

export default EBNavBar