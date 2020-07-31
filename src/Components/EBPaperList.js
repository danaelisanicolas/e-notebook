import React from 'react'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Box, Divider, ListItemSecondaryAction, IconButton, Typography } from '@material-ui/core';

import Delete from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core/styles';

const EBPaperList = ({user, notes, showNote , deleteNote, errMessage}) => {
  const useStyles = makeStyles((theme) => ({
    listContainer: {
      margin: '54px 10px',
      width: '25%',
    }
  }))

  const classes = useStyles()

  const listItemClickHandler = (e) => {
    showNote(e.currentTarget.parentElement.getAttribute('data-id'))
  }

  const deleteListItemHandler = (e) => {
    deleteNote(e.currentTarget.parentElement.parentElement.getAttribute('data-id'))
    e.stopPropagation()
  }

  return(
    <Box className={classes.listContainer}>
      <Typography variant="h6">
        Saved Notes
      </Typography>
      {errMessage ? <Typography variant='body2'>{errMessage}</Typography> : null}
      <List id='notes-list'>
        {notes ? (notes.map(note => {
          return(
            <ListItem data-id={note.id}>
              <ListItemText onClick={listItemClickHandler}>{note.title}</ListItemText>
              <ListItemSecondaryAction>
                <IconButton edge='end' onClick={deleteListItemHandler}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
              <Divider />
            </ListItem>
          )
        })) : (
          <Typography variant='body2'>Your saved notes will appear here.</Typography>
        )
      }
     </List>
    </Box>
  )
}

export default EBPaperList