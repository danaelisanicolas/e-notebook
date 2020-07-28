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

import { authFirebase } from '../scripts/firebaseHandler'

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
    redirect: {
      width: '100%',
      textAlign: 'right'
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

    if (props.openLogin) {
      openModalHandler()
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
    if (e.target.id === 'logout-menu') {
      props.signout()
    } else {

    }
    setAnchorEl(null);
  };

  const classes = useStyles()

  const openModalHandler = (e) => {
    if (e === 'login-navbar') {
      setIsLogin(true)
    } else if (props.openLogin) {

    }
    else {
      setIsLogin(false)
    }
    handleModalOpen()
  }

  const loginButtonHandler = (e) => {
    e.preventDefault()

    const loginForm = document.querySelector('#login-form')

    props.login(loginForm['login-email'].value, loginForm['login-password'].value)
    setOpen(false)
  }

  const signUpButtonHandler = (e) => {
    e.preventDefault()

    const signupForm = document.querySelector('#signup-form')

    props.signup(signupForm['signup-email'].value, signupForm['signup-password'].value)
    setOpen(false)
  }

  const redirectLinkHandler = (e) => {
    if (e.target.id === 'to-login') {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }

  const validate = (e) => {
    if (e.target.id === 'login-email') {
      const loginForm = document.querySelector('#login-form')

      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(loginForm['login-email'].value)) {
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
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(signupForm['signup-email'].value)) {
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

  const loginBody = (
    <div style={modalStyle} id='login-modal' className={classes.paper}>
      <Typography variant='h4' className={classes.inputTitle}>Login</Typography>
      <form id='login-form' onSubmit={loginButtonHandler}>
        <Box className={classes.box}>
          <TextField id='login-email' error={emailErrorText ? true : false} helperText={emailErrorText} onBlur={validate} className={classes.inputs} required label='Email' autoComplete='email' />
        </Box>
        <Box className={classes.box}>
          <TextField id='login-password' error={passwordErrorText ? true : false} helperText={passwordErrorText} onBlur={validate} className={classes.inputs} required label='Password' type='password' autoComplete='current-password' />
        </Box>
        <Box className={classes.box}>
          <Button type='submit' className={classes.loginSignupButton} variant='contained' color='primary'>
            { isLogin ? 'Login' : 'Signup'}
          </Button>
        </Box>
      </form>
      <Box className={classes.redirect}>
        <Button onClick={redirectLinkHandler}>
          <Typography id='to-signup' variant='body2' style={{'fontSize':'12px', 'color': 'darkblue'}}>Don't have an account? Sign up here ></Typography>
        </Button>
      </Box>
    </div>
  );

  const signupBody = (
    <div style={modalStyle} id='signup-modal' className={classes.paper}>
      <Typography variant='h4' className={classes.inputTitle}>Sign up</Typography>
      <form id='signup-form' onSubmit={signUpButtonHandler}>
        <Box className={classes.box}>
          <TextField id='signup-email' error={emailErrorText ? true : false} helperText={emailErrorText} onBlur={validate} className={classes.inputs} required label='Email' autoComplete='email' />
        </Box>
        <Box className={classes.box}>
          <TextField id='signup-password' error={passwordErrorText ? true : false} helperText={passwordErrorText} onBlur={validate} className={classes.inputs} required label='Password' type='password' autoComplete='new-password' />
        </Box>
        <Box className={classes.box}>
          <TextField id='signup-confirm-pass' error={confirmPasswordErrorText ? true : false} helperText={confirmPasswordErrorText} onBlur={validate} className={classes.inputs} required label='Re-enter Password' type='password' autoComplete='new-password' />
        </Box>
        <Box className={classes.box}>
          <Button type='submit' className={classes.loginSignupButton} variant='contained' color='primary'>
            { isLogin ? 'Login' : 'Signup'}
          </Button>
        </Box>
      </form>
      <Box className={classes.redirect}>
        <Button onClick={redirectLinkHandler}>
          <Typography id='to-login' variant='body2' style={{'font-size':'12px', 'color': 'darkblue'}}>Already have an account? Log in here ></Typography>
        </Button>
      </Box>
    </div>
  );

  return(
    <AppBar className={classes.bar} position="static">
      <Modal id='modal' open={open} onClose={handleModalClose}>
        {isLogin ? loginBody : signupBody}
      </Modal>
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