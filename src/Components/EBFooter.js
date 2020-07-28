import React from 'react'

import Divider from '@material-ui/core/Divider'
import { Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import { RiGithubLine, RiLinkedinLine } from 'react-icons/ri'

const EBFooter = (props) => {
  const useStyles = makeStyles((theme) => ({
    footer: {
      display: 'flex',
      margin: '24px',
      justifyContent: 'flex-start',
      textAlign: 'left',
      fontSize: '12px',
    },
    footerContainer: {
      margin: '44px',
    },
    name: {
      flexGrow: '1',
    },
    footerLinks: {
      textAlign: 'right',
      fontSize: '14px',
      margin: 'auto 10px'
    }
  }))

  const classes = useStyles()

  return(
    <Box className={classes.footerContainer}>
      <Divider />
      <footer className={classes.footer}>
        <Typography className={classes.name} variant='caption'>Dana Nicolas © {new Date().getFullYear()}</Typography>
        <Typography className={classes.footerLinks} variant='caption'>
          <RiGithubLine />
        </Typography>
        <Typography className={classes.footerLinks} variant='caption'>
          <RiLinkedinLine />
        </Typography>
      </footer>
    </Box>
  )
}

export default EBFooter