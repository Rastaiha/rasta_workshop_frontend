import './Style.scss';

import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { DriveEtaOutlined } from '@material-ui/icons';
import {
  Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  backgroundVideo: {
    position: 'fixed',
    top: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '100%',
    height: '100vh',
  },
  section1: {
    height: '100vh',
    color: 'black',
    position: 'relative',
  },
}));


const BombEvent = () => {
  const classes = useStyles();
  const videoRef = useRef();


  setInterval(() => {
    console.log(window.pageYOffset)
    // videoRef.current.currentTime = window.pageYOffset / 100;
  }, 100)

  useEffect(() => {

  }, [window.pageYOffset])


  return (
    <div style={{ height: '1500vh' }}>
      <Button variant='contained' color='primary'>
        سلام
      </Button>
      <p id='digital'>
        123346789
      </p>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({

})

export default connect(
  mapStateToProps,
  {

  }
)(BombEvent);