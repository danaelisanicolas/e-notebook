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

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { makeStyles } from '@material-ui/core/styles';

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
  const [ currentNote, setCurrentNote ] = useState(null)
  const [ successSave, setSuccessSave ] = useState(false)
  const [ deleteNoteId, setDeleteNoteId ] = useState(null)

  const [modalStyle] = useState(getModalStyle);
  const [modalOpen, setModalOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [isLogin, setIsLogin] = useState(false);
  const [passwordErrorText, setPasswordErrorText] = useState(null)
  const [emailErrorText, setEmailErrorText] = useState(null)
  const [confirmPasswordErrorText, setconfirmPasswordErrorText] = useState(null)

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
      margin: '34px 0px auto'
    },
    box: {
      margin: '14px auto',
      width: '90%',
      display: 'flex',
      justifyContent: 'center',
    },
    loginSignupButton: {
      margin: '20px 0px auto'
    },
    redirect: {
      width: '100%',
      textAlign: 'right'
    },
    errorText: {
      width: '100%',
      textAlign: 'center',
      color: 'red',
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
  }

  const loginHandler = () => {
    setIsLogin(true)
    handleModalOpen()
  }

  const signupHandler = () => {
    setIsLogin(false)
    handleModalOpen()
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

  const handleCloseDeleteDialog = (e) => {
    if (e.target.parentElement.id) {
      if (e.target.parentElement.id === 'confirm-delete') {
        deleteNoteWithId(deleteNoteId).then(res => {
          setCurrentNote(null)
        }).catch(err => {
          console.log(err.message)
        })
      }
    }
    setOpenDeleteDialog(false)
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
      if (err.code==='auth/user-not-found') {
        setErrorLoginSignupText('Uh-oh. It says you aren\'t yet on our system. Did you mean to sign up?')
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
      setErrorLoginSignupText(err.message)
    })
  }

  const signoutHandler = () => {
    authFirebase().signOut()
  }

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

  const loginBody = (
    <div style={modalStyle} id='login-modal' className={classes.paper}>
      <Typography variant='h4' className={classes.inputTitle}>Login</Typography>
      {errorLoginSignupText ? (<Typography variant='body2' className={classes.errorText}>{errorLoginSignupText}</Typography>) : null}
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
  )

  const signupBody = (
    <div style={modalStyle} id='signup-modal' className={classes.paper}>
      <Typography variant='h4' className={classes.inputTitle}>Sign up</Typography>
      {errorLoginSignupText ? (<Typography variant='body2' className={classes.errorText}>{errorLoginSignupText}</Typography>) : null}
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
  )

  const deleteConfirmationDialog = (
    <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">{'Are you sure you want to delete this note?'}</DialogTitle>
        <DialogActions>
          <Button id='cancel-delete' onClick={handleCloseDeleteDialog} color="primary">
            No
          </Button>
          <Button id='confirm-delete' onClick={handleCloseDeleteDialog} color="primary" autoFocus>
            Yes I'm sure
          </Button>
        </DialogActions>
      </Dialog>
  )

  return(
    <Box>
      {openDeleteDialog ? deleteConfirmationDialog : null}
      <Modal id='modal' open={modalOpen} onClose={handleModalClose}>
        {isLogin ? loginBody : signupBody}
      </Modal>
      <EBNavBar openLogin={login} user={user} login={loginHandler} signup={signupHandler} signout={signoutHandler}/>
      <Box className={classes.container}>
        <EBPaper currentNote={currentNote} saveNote={saveNote} successSave={successSave}/>
        <EBPaperList notes={notes} showNote={showNote} deleteNote={deleteNote} />
      </Box>
      <EBFooter />
    </Box>
  )
}

export default EBMain