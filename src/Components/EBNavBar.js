import React from 'react'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal'
import Box from '@material-ui/core/Box'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { makeStyles } from '@material-ui/core/styles';

import AccountCircle from '@material-ui/icons/AccountCircle'
import { TextField } from '@material-ui/core';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    outline: 'none',
  };
}

const EBNavBar = (props) => {
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);

  const useStyles = makeStyles((theme) => ({
    brand: {
      flexGrow: 1,
      margin: 'auto 44px'
    },
    navItem: {
      display: 'flex',
      justifyContent: 'flexEnd',
    },
    paper: {
      position: 'absolute',
      width: '40%',
      backgroundColor: 'white',
      padding: theme.spacing(0, 4, 8),
    },
    inputs: {
      width: '100%'
    },
    inputTitle: {
      textAlign: 'center',
      margin: '34px 0px auto'
    },
    box: {
      margin: '14px auto',
      width: '90%'
    },
    menuList: {
      justifyContent: 'flex-end',
    }
  }))

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (e) => {
    console.log(e.target.id)
    setAnchorEl(null);
  };

  const classes = useStyles()

  const openModalHandler = (e) => {
    console.log(e)
    if (e == 'login-navbar') {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
    handleModalOpen()
  }

  const loginBody = (
    <div style={modalStyle} id='login-modal' className={classes.paper}>
      <Typography variant='h4' className={classes.inputTitle}>Login</Typography>
      <Box className={classes.box}>
        <TextField className={classes.inputs} required label='Email' />
      </Box>
      <Box className={classes.box}>
        <TextField className={classes.inputs} required label='Password' type='password' />
      </Box>
    </div>
  );

  const signupBody = (
    <div style={modalStyle} id='signup-modal' className={classes.paper}>
      <Typography variant='h4' className={classes.inputTitle}>Sign up</Typography>
      <Box className={classes.box}>
        <TextField className={classes.inputs} required label='Email' />
      </Box>
      <Box className={classes.box}>
        <TextField className={classes.inputs} required label='Password' type='password' />
      </Box>
      <Box className={classes.box}>
        <TextField className={classes.inputs} required label='Re-enter Password' type='password' />
      </Box>
    </div>
  );

  return(
    <AppBar position="static">
      <Modal open={open} onClose={handleModalClose}>
        {isLogin ? loginBody : signupBody}
      </Modal>
      <Toolbar variant='dense'>
        <Typography className={classes.brand} variant="h4" color="inherit" align='left'>
          E-Notebook
        </Typography>
        <ul className={classes.navItem}>
          <Button variant="h6" color="inherit">
            Home
          </Button>
          <Button variant="h6" color="inherit">
            About
          </Button>
          <Button onClick={() => openModalHandler('login-navbar')} variant="h6" color="inherit">
            Log in
          </Button>
          <Button onClick={() => openModalHandler('signup-navbar')} variant="h6" color="inherit">
            Sign up
          </Button>
          <Button id='login-link' variant="h6" color="inherit">
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
        </ul>
      </Toolbar>
    </AppBar>
  )
}

export default EBNavBar