import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField';
import { Container, Box, Button } from '@material-ui/core';

const EBPaper = (props) => {

  const [ note, setNote ] = useState({
    title: '',
    content: ''
  });
  const [ contentErrorText, setContentErrorText ] = useState(null)
  const [ titleErrorText, setTitleErrorText ] = useState(null)

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '75%',
      height: '650px',
      margin: '24px',
    },
    textfield: {
      width: '95%',
      height: '70%',
      margin: 'auto',
      maxWidth: '95%',
      minWidth: '95%',
      maxHeight: '70%',
    },
    title: {
      width: '95%',
      margin: '12px auto',
      maxWidth: '95%',
      minWidth: '95%',
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

  useEffect(() => {
    if (props.currentNote) {
      setNote({
        title: props.currentNote.title,
        content: props.currentNote.content,
      })
    } else {
      setNote({
        title: '',
        content: '',
      })
    }
  }, [props.currentNote])

  useEffect(() => {
    setNote({
      title: '',
      content: '',
    })
  }, [props.successSave])

  const contentChangeHandler = (e) => {
    if (e.target.value.length > 1000000) {
      setContentErrorText(e.target.value.length.toString() + '/1000000')
    } else {
      setContentErrorText(null)
    }

    setNote({
      ...note,
      content: e.target.value,
    })
  }

  const titleChangeHandler = (e) => {
    if (e.target.value.length > 1500) {
      setTitleErrorText(e.target.value.length.toString() + '/1500')
    } else {
      setTitleErrorText(null)
    }

    setNote({
      ...note,
      title: e.target.value
    })
  }

  const newPaperHandler = (e) => {
    setNote({
      title: '',
      content: '',
    })
  }

  const savePaperHandler = (e) => {
    props.saveNote(note)
  }

  return(
    <Container className={classes.root}>
      <Box className={classes.buttonContainer}>
        <Button onClick={savePaperHandler} className={classes.button} color='primary' variant='contained' disableElevation>
          Save
        </Button>
        <Button onClick={newPaperHandler} className={classes.button} color='secondary' variant='contained' disableElevation>
          New
        </Button>
      </Box>
      <TextField className={classes.title} error={titleErrorText ? true : false} helperText={titleErrorText} placeholder='Title here...' variant='outlined' value={note['title']} onChange={titleChangeHandler}/>
      <Paper elevation={0}>
        <TextField onChange={contentChangeHandler} error={contentErrorText ? true : false} helperText={contentErrorText} value={note['content']} variant="outlined" placeholder='Your notes here...' multiline rows={25} className={classes.textfield}/>
      </Paper>
    </Container>

  )
}

export default EBPaper