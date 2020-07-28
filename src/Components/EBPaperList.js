import React, { useState, useEffect } from 'react'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Box, Divider, ListItemSecondaryAction, IconButton, Typography } from '@material-ui/core';

import Delete from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core/styles';

const EBPaperList = (props) => {
  const useStyles = makeStyles((theme) => ({
    listContainer: {
      margin: '54px 10px',
      width: '25%',
    }
  }))

  const classes = useStyles()

  return(
    <Box className={classes.listContainer}>
      <Typography variant="h6">
        Saved Notes
      </Typography>
      <List id='notes-list'>
        {props.notes ? (props.notes.map(note => {
          return(
            <ListItem>
              <ListItemText>{note.title}</ListItemText>
              <ListItemSecondaryAction>
                <IconButton edge='end'>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
              <Divider></Divider>
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