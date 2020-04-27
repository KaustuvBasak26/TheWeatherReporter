import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Loader from '../Loader/Loader';
import classes from './Modal.module.css';

const LoaderModal = ({loading}) => {
 

  return (
    <div>
    <Modal isOpen={loading} className={classes.Wrapper}>
      <ModalHeader style={{height:"5em", border:0}}></ModalHeader>
      <ModalBody style={{height:"20em"}}>
        <Loader/>
        <div style={{display:"block"}} className={classes.LoadText}>Loading...</div>
      </ModalBody>
      <ModalFooter style={{height:"8em", border:0}}>
            
      </ModalFooter>
    </Modal>
  </div>
  );
}

export default LoaderModal;