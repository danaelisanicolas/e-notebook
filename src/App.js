import React from 'react';
import './App.css';

import EBNavBar from './Components/EBNavBar'
import EBPaper from './Components/EBPaper'
import EBPaperList from './Components/EBPaperList'
import EBFooter from './Components/EBFooter'

import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';

function App() {
  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
    }
  }))

  const classes = useStyles()

  return (
    <div className="App">
      <EBNavBar />
      <Box className={classes.container}>
        <EBPaper />
        <EBPaperList />
      </Box>
      <EBFooter />
    </div>
  );
}

export default App;
