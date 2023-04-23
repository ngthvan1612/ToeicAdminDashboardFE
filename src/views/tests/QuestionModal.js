import React, { useEffect, useState } from "react";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react";

const QuestionModal = (props) => {
  const [visible, setVisible] = useState(props.visible);
  return (
    <CModal visible={props.visible} onClose={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>Modal title</CModalTitle>
      </CModalHeader>
      <CModalBody>
        Woohoo, you&#39;re reading this text in a modal! Woohoo, you&#39;re
        reading this text in a modal! Woohoo, you&#39;re reading this text in a
        modal! Woohoo, you&#39;re reading this text in a modal! Woohoo,
        you&#39;re reading this text in a modal! Woohoo, you&#39;re reading this
        text in a modal! Woohoo, you&#39;re reading this text in a modal!
        Woohoo, you&#39;re reading this text in a modal! Woohoo, you&#39;re
        reading this text in a modal! Woohoo, you&#39;re reading this text in a
        modal! Woohoo, you&#39;re reading this text in a modal! Woohoo,
        you&#39;re reading this text in a modal!Woohoo, you&#39;re reading this
        text in a modal!
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Close
        </CButton>
        <CButton color="primary">Save changes</CButton>
      </CModalFooter>
    </CModal>
  );
};
export default QuestionModal;
