import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { sizing } from '@material-ui/system'

import Paper from '@material-ui/core/Paper'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import { Container, Box, Button } from '@material-ui/core';

const EBPaper = (props) => {

  const [ note, setNote ] = useState('');

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '75%',
      height: '650px',
      margin: '24px',
    },
    textfield: {
      width: '95%',
      height: '95%',
      margin: 'auto',
      maxWidth: '95%',
      minWidth: '95%',
      maxHeight: '95%',
    },
    button: {
      display: 'inline-flex !important',
      flexDirection: 'row',
      margin: '8px',
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      width: '100%',
      margin: '10px 24px'
    }}
  ))

  const classes = useStyles()

  return(
    <Container className={classes.root}>
      <Box className={classes.buttonContainer}>
        <Button className={classes.button} color='primary' variant='contained' disableElevation>
          Save
        </Button>
        <Button className={classes.button} color='secondary' variant='contained' disableElevation>
          New
        </Button>
      </Box>
      <Paper elevation={0}>
        <TextField variant="outlined" placeholder='Your notes here...' multiline rows={30} className={classes.textfield} multiline/>
      </Paper>
    </Container>

  )
}

export default EBPaper