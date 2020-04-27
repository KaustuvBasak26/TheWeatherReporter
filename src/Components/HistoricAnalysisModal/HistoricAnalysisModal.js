import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AnalysisTabs from '../Analysis Tabs/AnalysisTabs';

const HistoricAnalysisModal = ({modal, setModal, city}) => {
  

  const toggle = () => setModal(!modal);

  return (
    <div style={{width:"100em"}}>
      <Modal isOpen={modal} toggle={toggle} className="modal-lg">
        <ModalHeader toggle={toggle}>Historic Analysis</ModalHeader>
        <ModalBody>
          <AnalysisTabs city={city}/>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default HistoricAnalysisModal;