import React from 'react'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import { makeStyles } from '@material-ui/core/styles';

import AccountCircle from '@material-ui/icons/AccountCircle'

const EBNavBar = (props) => {
  const useStyles = makeStyles((theme) => ({
    brand: {
      flexGrow: 1,
      margin: 'auto 44px'
    },
    navItem: {
      display: 'flex',
      justifyContent: 'flexEnd',
    }
  }))

  const classes = useStyles()

  return(
  <AppBar position="static">
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
        <Button variant="h6" color="inherit">
          Log in
        </Button>
        <Button variant="h6" color="inherit">
          Sign up
        </Button>
        <Button variant="h6" color="inherit">
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Button>
      </ul>
    </Toolbar>
  </AppBar>
)
}

export default EBNavBar