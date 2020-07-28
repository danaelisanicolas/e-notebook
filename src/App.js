import React, { useState, useEffect } from 'react';
import './App.css';

import EBNavBar from './Components/EBNavBar'
import EBPaper from './Components/EBPaper'
import EBPaperList from './Components/EBPaperList'
import EBFooter from './Components/EBFooter'

import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';

import './scripts/utilities'
import { loginWithAuth, signinWithAuth, authFirebase, getNotesWithUserId } from './scripts/firebaseHandler'

function App() {
  const [ login, setLogin ] = useState(false)
  const [ user, setUser ] = useState(null)
  const [ notes, setNotes ] = useState(null)

  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
    }
  }))

  useEffect(() => {
    if (user) {
      getNotes()
    }
  }, [user])

  const classes = useStyles()

  const forceLogin = () => {
    setLogin(true)
  }

  const loginHandler = (email, password) => {
    loginWithAuth(email, password).then(cred => {
      setUser(cred.user)
    })
  }

  const signupHandler = (email, password) => {
    signinWithAuth(email, password).then(cred => {
      setUser(cred.user)
    })
  }

  const signoutHandler = () => {
    authFirebase().signOut()
    setUser(null)
  }

  const getNotes = () => {
    if (user) {
      getNotesWithUserId(user.uid).onSnapshot(snapshot => {
        let n = []
        snapshot.forEach(doc => {
          n.push(doc.data())
        })
        setNotes(n)
      })
    } else {
      setNotes(null)
    }
  }

  authFirebase().onAuthStateChanged(user => {
    setLogin(false)
    if (user) {
      setUser(user)
    }
  })

  return (
    <div className="App">
      <EBNavBar openLogin={login} user={user} login={loginHandler} signup={signupHandler} signout={signoutHandler}/>
      <Box className={classes.container}>
        <EBPaper forceLogin={forceLogin} user={user} />
        <EBPaperList user={user} notes={notes} />
      </Box>
      <EBFooter />
    </div>
  );
}

export default App;
