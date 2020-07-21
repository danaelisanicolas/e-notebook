import React, {useEffect, useState} from 'react'

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

import { loginWithAuth, authStateChange, signinWithAuth } from '../scripts/firebaseHandler'

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
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const [user, setUser] = useState(null)
  const [passwordErrorText, setPasswordErrorText] = useState(null)
  const [emailErrorText, setEmailErrorText] = useState(null)
  const [confirmPasswordErrorText, setconfirmPasswordErrorText] = useState(null)

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
      padding: theme.spacing(0, 4, 4),
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
      width: '90%',
      display: 'flex',
      justifyContent: 'center',
    },
    menuList: {
      justifyContent: 'flex-end',
    },
    loginSignupButton: {
      margin: '20px 0px auto'
    },
  }))

  useEffect(() => {
    const loggedOutLinks = document.querySelectorAll('#logout-link')
    const loggedInLinks = document.querySelectorAll('#login-link')

    if (user) {
      loggedOutLinks.forEach(item => item.style.display = 'none')
      loggedInLinks.forEach(item => item.style.display = 'block')
    } else {
      loggedOutLinks.forEach(item => item.style.display = 'block')
      loggedInLinks.forEach(item => item.style.display = 'none')
    }
  })

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setconfirmPasswordErrorText(null)
    setPasswordErrorText(null)
    setEmailErrorText(null)
    setOpen(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (e) => {
    setAnchorEl(null);
  };

  const classes = useStyles()

  const openModalHandler = (e) => {
    if (e === 'login-navbar') {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
    handleModalOpen()
  }

  const loginButtonHandler = (e) => {
    const loginForm = document.querySelector('#login-form')

    loginWithAuth(loginForm['login-email'].value, loginForm['login-password'].value).then(cred => {
      setUser(cred.user)
      setOpen(false)
    })
  }

  const validate = (e) => {
    if (e.target.id === 'login-email') {
      const loginForm = document.querySelector('#login-form')

      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(loginForm['login-email'].value)) {
        setEmailErrorText(null)
      } else {
        setEmailErrorText('Invalid Email')
      }
    } else if (e.target.id === 'login-password') {
      const loginForm = document.querySelector('#login-form')
      if (loginForm['login-password'].value.length >= 6) {
        setPasswordErrorText(null)
      } else {
        setPasswordErrorText('Password must be at least 6 characters')
      }
    } else if (e.target.id === 'signup-email') {
      const signupForm = document.querySelector('#signup-form')
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(signupForm['signup-email'].value)) {
        setEmailErrorText(null)
      } else {
        setEmailErrorText('Invalid Email')
      }
    } else if (e.target.id === 'signup-password') {
      const signupForm = document.querySelector('#signup-form')
      if (signupForm['signup-password'].value.length >= 6) {
        setPasswordErrorText(null)
      } else {
        setPasswordErrorText('Password must be at least 6 characters')
      }
    } else if (e.target.id === 'signup-confirm-pass') {
      const signupForm = document.querySelector('#signup-form')
      if ((signupForm['signup-confirm-pass'].value.length >= 6) && (signupForm['signup-password'] === signupForm['signup-confirm-pass'])) {
        setconfirmPasswordErrorText(null)
      } else {
        setconfirmPasswordErrorText('Must be the same as password')
      }
    }
  }

  const signUpButtonHandler = (e) => {
    const signupForm = document.querySelector('#signup-form')

    signinWithAuth(signupForm['signup-email'].value, signupForm['signup-password'].value).then(cred => {
      setUser(cred.user)
      setOpen(false)
    })
  }

  const loginBody = (
    <div style={modalStyle} id='login-modal' className={classes.paper}>
      <Typography variant='h4' className={classes.inputTitle}>Login</Typography>
      <form id='login-form'>
        <Box className={classes.box}>
          <TextField id='login-email' error={emailErrorText ? true : false} helperText={emailErrorText} onBlur={validate} className={classes.inputs} required label='Email' />
        </Box>
        <Box className={classes.box}>
          <TextField id='login-password' error={passwordErrorText ? true : false} helperText={passwordErrorText} onBlur={validate} className={classes.inputs} required label='Password' type='password' />
        </Box>
        <Box className={classes.box}>
          <Button onClick={loginButtonHandler} className={classes.loginSignupButton} variant='contained' color='primary'>
            { isLogin ? 'Login' : 'Signup'}
          </Button>
        </Box>
      </form>
    </div>
  );

  const signupBody = (
    <div style={modalStyle} id='signup-modal' className={classes.paper}>
      <Typography variant='h4' className={classes.inputTitle}>Sign up</Typography>
      <form id='signup-form'>
        <Box className={classes.box}>
          <TextField id='signup-email' error={emailErrorText ? true : false} helperText={emailErrorText} onBlur={validate} className={classes.inputs} required label='Email' />
        </Box>
        <Box className={classes.box}>
          <TextField id='signup-password' error={passwordErrorText ? true : false} helperText={passwordErrorText} onBlur={validate} className={classes.inputs} required label='Password' type='password' />
        </Box>
        <Box className={classes.box}>
          <TextField id='signup-confirm-pass' error={confirmPasswordErrorText ? true : false} helperText={confirmPasswordErrorText} onBlur={validate} className={classes.inputs} required label='Re-enter Password' type='password' />
        </Box>
        <Box className={classes.box}>
          <Button onClick={signUpButtonHandler} className={classes.loginSignupButton} variant='contained' color='primary'>
            { isLogin ? 'Login' : 'Signup'}
          </Button>
        </Box>
      </form>
    </div>
  );

  return(
    <AppBar position="static">
      <Modal id='modal' open={open} onClose={handleModalClose}>
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
          <Button display={user ? 'none !important' : 'block !important'} id='logout-link' onClick={() => openModalHandler('login-navbar')} variant="h6" color="inherit">
            Log in
          </Button>
          <Button display={user ? 'none' : 'block'} id='logout-link' onClick={() => openModalHandler('signup-navbar')} variant="h6" color="inherit">
            Sign up
          </Button>
          <Button display={user ? 'block' : 'none'} id='login-link' variant="h6" color="inherit">
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