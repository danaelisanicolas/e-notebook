import React, { useState, useEffect } from 'react';


import EBNavBar from './EBNavBar'
import EBPaper from './EBPaper'
import EBPaperList from './EBPaperList'
import EBFooter from './EBFooter'

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent'

import { makeStyles } from '@material-ui/core/styles';
import { Visibility, VisibilityOff } from '@material-ui/icons'

import '../scripts/utilities'
import { loginWithAuth, signinWithAuth, authFirebase, getNotesWithUserId, deleteNoteWithId, saveNoteOnUserId, saveExistingNoteOnUserId } from '../scripts/firebaseHandler'

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

const EBMain = (props) => {
  const [ login, setLogin ] = useState(false)
  const [ user, setUser ] = useState(null)
  const [ notes, setNotes ] = useState(null)
  const [ errorLoginSignupText, setErrorLoginSignupText ] = useState(null)
  const [ errMessage, setErrMessage ] = useState(null)
  const [ currentNote, setCurrentNote ] = useState(null)
  const [ successSave, setSuccessSave ] = useState(false)
  const [ deleteNoteId, setDeleteNoteId ] = useState(null)
  const [ forgotPasswordModal, setForgotPasswordModal ] = useState(false)
  const [ showPassword, setShowPassword ] = useState(false);
  const [ showConfirmPassword, setShowConfirmPassword ] = useState(false);
  const [ passwordResetMessage, setPasswordResetMessage ] = useState(null);

  const [modalStyle] = useState(getModalStyle);
  const [modalOpen, setModalOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAccountDialog, setOpenAccountDialog] = useState(false);

  const [isLogin, setIsLogin] = useState(false);
  const [passwordErrorText, setPasswordErrorText] = useState(null)
  const [emailErrorText, setEmailErrorText] = useState(null)
  const [confirmPasswordErrorText, setconfirmPasswordErrorText] = useState(null)
  const [disableLoginSignupButton, setDisableLoginSignupButton] = useState(false)

  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
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
      margin: '34px 0px auto',
      width: '80%',
    },
    box: {
      margin: '14px auto',
      width: '90%',
      display: 'flex',
      justifyContent: 'center',
    },
    back: {
      margin: '14px auto',
      display: 'flex',
      justifyContent: 'flex-start'
    },
    loginSignupButton: {
      margin: '20px 0px auto'
    },
    additionalActions: {
      width: '100%',
      textAlign: 'right'
    },
    errorText: {
      width: '100%',
      textAlign: 'center',
      color: 'red',
      margin: '10px 0px',
    },
    confirmText: {
      width: '100%',
      textAlign: 'center',
      color: 'blue',
      margin: '10px 0px',
    }
  }))

  useEffect(() => {
    if (user) {
      getNotes()
    } else {
      setNotes(null)
    }
  }, [user])

  useEffect(() => {
    if ((emailErrorText) || (passwordErrorText) || (confirmPasswordErrorText)) {
      setDisableLoginSignupButton(true)
    } else {
      setDisableLoginSignupButton(false)
    }
  }, [emailErrorText, passwordErrorText, confirmPasswordErrorText])

  const classes = useStyles()

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setconfirmPasswordErrorText(null)
    setPasswordErrorText(null)
    setEmailErrorText(null)
    setErrorLoginSignupText(null)
    setModalOpen(false);
    setForgotPasswordModal(false)
    setShowPassword(false)
    setShowConfirmPassword(false)
  }

  const loginHandler = () => {
    setIsLogin(true)
    handleModalOpen()
  }

  const signupHandler = () => {
    setIsLogin(false)
    handleModalOpen()
  }

  const accountDetailsHandler = () => {
    setOpenAccountDialog(true)
  }

  const forgotPasswordHandler = (e) => {
    setForgotPasswordModal(true)
  }

  const backButtonHandler = (e) => {
    setForgotPasswordModal(false)
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
      if ((signupForm['signup-confirm-pass'].value.length >= 6) && (signupForm['signup-password'].value === signupForm['signup-confirm-pass'].value)) {
        setconfirmPasswordErrorText(null)
      } else {
        setconfirmPasswordErrorText('Must be the same as password')
      }
    } else if (e.target.id === 'forgot-password-email') {
      const forgotPasswordForm = document.querySelector('#forgot-password-form')
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(forgotPasswordForm['forgot-password-email'].value)) {
        setEmailErrorText(null)
      } else {
        setEmailErrorText('Invalid Email')
      }
    }
  }

  const showNote = (id) => {
    let note = notes.find(note => note.id === id)
    setCurrentNote(note)
  }

  const deleteNote = (id) => {
    setDeleteNoteId(id)
    setOpenDeleteDialog(true)
  }

  const handleCloseDialog = (e) => {
    if (e.target.parentElement.id) {
      if (e.target.parentElement.id === 'confirm-delete') {
        deleteNoteWithId(deleteNoteId).then(res => {
          setCurrentNote(null)
        }).catch(err => {
          setErrMessage(err.message)
        })
        setOpenDeleteDialog(false)
      } else if (e.target.parentElement.id === 'confirm-account') {
        setOpenAccountDialog(false)
      }
    }
  }

  const saveNote = (note) => {
    if (user) {
      if (currentNote) { //opened note
        let newNote = {
          ...currentNote,
          title: note.title,
          content: note.content
        }
        saveExistingNoteOnUserId(user.uid, newNote).then(res => {
          setCurrentNote(null)
          setSuccessSave(true)
        }).catch(err => {
          console.log('error: ', err.message)
        })
      } else {
        saveNoteOnUserId(user.uid, note).then(res => {
          setSuccessSave(true)
        }).catch(err => {
          console.log('error: ', err.message)
        })
      }
    } else {
      loginHandler()
    }
  }

  const loginButtonHandler = (e) => {
    e.preventDefault()

    const loginForm = document.querySelector('#login-form')
    loginWithAuth(loginForm['login-email'].value, loginForm['login-password'].value).then(cred => {
      setUser(cred.user)
      setModalOpen(false)
    }).catch(err => {
      console.log(err)
      if (err.code === 'auth/user-not-found') {
        setErrorLoginSignupText('Uh-oh. It says you aren\'t yet on our system. Did you mean to sign up?')
      } else if (err.code === 'auth/wrong-password') {
        setErrorLoginSignupText('Wrong password. Please login with your e-notebook account email and password.')
      } else {
        setErrorLoginSignupText(err.message)
      }
    })
  }

  const signUpButtonHandler = (e) => {
    e.preventDefault()

    const signupForm = document.querySelector('#signup-form')
    signinWithAuth(signupForm['signup-email'].value, signupForm['signup-password'].value).then(cred => {
      console.log('success')
      setUser(cred.user)
      setModalOpen(false)
    }).catch(err => {
      if (err.code === 'auth/email-already-exists') {
        setErrorLoginSignupText('This email is already taken. Did you mean to log in?')
      } else {
        setErrorLoginSignupText(err.message)
      }
    })
  }

  const forgotPasswordButtonHandler = (e) => {
    e.preventDefault()

    const forgotPasswordForm = document.querySelector('#forgot-password-form')
    authFirebase().sendPasswordResetEmail(forgotPasswordForm['forgot-password-email'].value)
      .then(() => {
        setPasswordResetMessage('Reset password link has been sent to your email.')
      })
      .catch((err) => {
        setErrorLoginSignupText(err.code + '. Sorry that\'s on us. Please try again later.')
      });
  }

  const signoutHandler = () => {
    authFirebase().signOut()
  }

  const handleClickShowPassword = () => setShowPassword(!showPassword)

  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword)

  const getNotes = () => {
    if (user) {
      getNotesWithUserId(user.uid).onSnapshot(snapshot => {
        let n = []
        snapshot.forEach(doc => {
          n.push({...doc.data(),
            id: doc.id})
        })
        setNotes(n)
      })
    } else {
      setNotes(null)
    }
  }

  authFirebase().onAuthStateChanged(user => {
    setLogin(false)
    setUser(user)
  })

  const forgotPasswordBody = (
    <div style={modalStyle} id='forgot-password-modal' className={classes.paper}>
      <Box className={classes.back}>
        <Button color='primary' onClick={backButtonHandler}>
          {'< Back'}
        </Button>
        <Typography variant='h6' className={classes.inputTitle}>Forgot Password</Typography>
      </Box>
      {passwordResetMessage ? (
        <Box>
          <Typography variant='body2' className={classes.confirmText}>{passwordResetMessage}</Typography>
        </Box>) : null}
      {errorLoginSignupText ? (
      <Box>
        <Typography variant='body2' className={classes.errorText}>{passwordResetMessage}</Typography>
      </Box>) : null}
      <form id='forgot-password-form' onSubmit={forgotPasswordButtonHandler}>
        <Box className={classes.box}>
          <TextField id='forgot-password-email' error={emailErrorText ? true : false} helperText={emailErrorText} onBlur={validate} className={classes.inputs} required label='Email' autoComplete='email' />
        </Box>
        <Box className={classes.box}>
          <Button type='submit' className={classes.loginSignupButton} variant='contained' color='primary'>
            Reset Password
          </Button>
        </Box>
      </form>
    </div>
  )

  const loginBody = ( forgotPasswordModal ? forgotPasswordBody : (
    <div style={modalStyle} id='login-modal' className={classes.paper}>
      <Typography variant='h4' className={classes.inputTitle}>Login</Typography>
      {errorLoginSignupText ? (<Typography variant='body2' className={classes.errorText}>{errorLoginSignupText}</Typography>) : null}
      <form id='login-form' onSubmit={loginButtonHandler}>
        <Box className={classes.box}>
          <TextField id='login-email' error={emailErrorText ? true : false} helperText={emailErrorText} onBlur={validate} className={classes.inputs} required label='Email' autoComplete='email' />
        </Box>
        <Box className={classes.box}>
          <TextField id='login-password' error={passwordErrorText ? true : false} helperText={passwordErrorText} onBlur={validate} className={classes.inputs} required label='Password' type={showPassword ? 'text' : 'password'} autoComplete='current-password' InputProps={{
               endAdornment: (<InputAdornment position="end">
                  <IconButton aria-label='toggle password visibility'
                    edge="end"
                    onClick={handleClickShowPassword} >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>)
           }} />
        </Box>
        <Box className={classes.box}>
          <Button disabled={disableLoginSignupButton ? true : false} type='submit' className={classes.loginSignupButton} variant='contained' color='primary'>
            Login
          </Button>
        </Box>
      </form>
      <Box className={classes.additionalActions}>
        <Button onClick={forgotPasswordHandler}>
          <Typography id='forgot-password' variant='body2' style={{'fontSize':'12px', 'color': 'darkblue'}}>Forgot Password?</Typography>
        </Button>
      </Box>
      <Box className={classes.additionalActions}>
        <Button onClick={redirectLinkHandler}>
          <Typography id='to-signup' variant='body2' style={{'fontSize':'12px', 'color': 'darkblue'}}>Don't have an account? Sign up here ></Typography>
        </Button>
      </Box>
    </div>
  ))

  const signupBody = (
    <div style={modalStyle} id='signup-modal' className={classes.paper}>
      <Typography variant='h4' className={classes.inputTitle}>Sign up</Typography>
      {errorLoginSignupText ? (<Typography variant='body2' className={classes.errorText}>{errorLoginSignupText}</Typography>) : null}
      <form id='signup-form' onSubmit={signUpButtonHandler}>
        <Box className={classes.box}>
          <TextField id='signup-email' error={emailErrorText ? true : false} helperText={emailErrorText} onBlur={validate} className={classes.inputs} required label='Email' autoComplete='email' />
        </Box>
        <Box className={classes.box}>
          <TextField id='signup-password' error={passwordErrorText ? true : false} helperText={passwordErrorText} onBlur={validate} className={classes.inputs} required label='Password' type={ showPassword ? 'text' : 'password'} autoComplete='new-password' InputProps={{
               endAdornment: (<InputAdornment position="end">
                  <IconButton aria-label='toggle password visibility'
                    edge="end"
                    onClick={handleClickShowPassword} >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>)
           }} />
        </Box>
        <Box className={classes.box}>
          <TextField id='signup-confirm-pass' error={confirmPasswordErrorText ? true : false} helperText={confirmPasswordErrorText} onBlur={validate} className={classes.inputs} required label='Re-enter Password' type={showConfirmPassword ? 'text' : 'password'} autoComplete='new-password' InputProps={{
               endAdornment: (<InputAdornment position="end">
                  <IconButton aria-label='toggle confirm password visibility'
                    edge="end"
                    onClick={handleClickShowConfirmPassword} >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>)
           }} />
        </Box>
        <Box className={classes.box}>
          <Button disabled={disableLoginSignupButton ? true : false} type='submit' className={classes.loginSignupButton} variant='contained' color='primary'>
            Signup
          </Button>
        </Box>
      </form>
      <Box className={classes.additionalActions}>
        <Button onClick={redirectLinkHandler}>
          <Typography id='to-login' variant='body2' style={{'font-size':'12px', 'color': 'darkblue'}}>Already have an account? Log in here ></Typography>
        </Button>
      </Box>
    </div>
  )

  const deleteConfirmationDialog = (
    <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">{'Are you sure you want to delete this note?'}</DialogTitle>
        <DialogActions>
          <Button id='cancel-delete' onClick={handleCloseDialog} color="primary">
            No
          </Button>
          <Button id='confirm-delete' onClick={handleCloseDialog} color="primary" autoFocus>
            Yes I'm sure
          </Button>
        </DialogActions>
      </Dialog>
  )

  const accountDetailsDialog = (
    <Dialog
      open={openAccountDialog}
      onClose={handleCloseDialog}
      aria-labelledby="account-dialog-title"
    >
      <DialogTitle id='account-dialog-title'>{'Account Details'}</DialogTitle>
      <DialogContent>
        <Typography variant='body2'>{user ? 'Logged in as: ' + (user.email) : ''}</Typography>
      </DialogContent>
      <DialogActions>
        <Button id='confirm-account' onClick={handleCloseDialog} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )

  return(
    <Box>
      {openDeleteDialog ? deleteConfirmationDialog : null}
      {openAccountDialog ? accountDetailsDialog : null}
      <Modal id='modal' open={modalOpen} onClose={handleModalClose}>
        {isLogin ? loginBody : signupBody}
      </Modal>
      <EBNavBar openLogin={login} user={user} login={loginHandler} signup={signupHandler} signout={signoutHandler} account={accountDetailsHandler}/>
      <Box className={classes.container}>
        <EBPaper currentNote={currentNote} saveNote={saveNote} successSave={successSave}/>
        <EBPaperList notes={notes} showNote={showNote} deleteNote={deleteNote} errMessage={errMessage}/>
      </Box>
      <EBFooter />
    </Box>
  )
}

export default EBMain