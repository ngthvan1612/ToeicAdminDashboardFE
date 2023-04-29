import React, { useEffect, useRef, useState } from "react";
import { CButton, CForm, CFormInput, CFormLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react";
import { useParams } from "react-router-dom";
import { createWord } from "src/api/toeicVocabSystem";

const ToeicCreateVocabularyModal = (props) => {
  const [visible, setVisible] = useState(false)
  const onCreatedSuccessfully = props.onCreatedSuccessfully ?? function() { };
  const params = useParams();
  
  const topicId = params.topicId;

  const defaultFormState = {
    english: '',
    vietnamese: '',
    pronounce: '',
    exampleEnglish: '',
    exampleVietnamese: ''
  }
  
  const [form, setForm] = useState(defaultFormState);

  const handleFormChangedData = (e) => {
    const { name, value } = e.target;
    if (name) {
      setForm({
        ...form,
        [name]: value
      })
    }
  }
  
  const handleSubmitForm = (e) => {
    if (e) {
      e.preventDefault();
    }

    for (const key in form) {
      if (!form[key]) {
        alert(key + " cannot be null");
        return;
      }
    }

    const preparedData = {
      ...form,
      topicId
    };
    createWord(preparedData)
      .then(() => onCreatedSuccessfully())
      .catch((err) => alert(err.response.data.message));
  }

  useEffect(() => {
    setForm({...defaultFormState});
  }, [visible])

  return (
    <>
      <CButton size="sm" color="success" className="text-white" onClick={() => setVisible(!visible)}>Create vocabulary</CButton>
      <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Create vocaublary</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm
            onSubmit={(e) => handleSubmitForm(e)}
          >
            <div className="mb-3">
              <CFormLabel>English</CFormLabel>
              <CFormInput
                type="text"
                placeholder="Hello"
                value={form.english}
                name="english"
                onChange={handleFormChangedData}
              />
            </div>
            <div className="mb-3">
              <CFormLabel>Vietnamese</CFormLabel>
              <CFormInput
                type="text"
                placeholder="Xin chào"
                value={form.vietnamese}
                name="vietnamese"
                onChange={handleFormChangedData}
              />
            </div>
            <div className="mb-3">
              <CFormLabel>Pronounce</CFormLabel>
              <CFormInput
                type="text"
                placeholder="/he'ləʊ/"
                value={form.pronounce}
                name="pronounce"
                onChange={handleFormChangedData}
              />
            </div>
            <div className="mb-3">
              <CFormLabel>Example English</CFormLabel>
              <CFormInput
                type="text"
                placeholder="Hello, what is your name?"
                value={form.exampleEnglish}
                name="exampleEnglish"
                onChange={handleFormChangedData}
              />
            </div>
            <div className="mb-3">
              <CFormLabel>Example Vietnamese</CFormLabel>
              <CFormInput
                type="text"
                placeholder="Xin chào, bạn tên là gì?"
                value={form.exampleVietnamese}
                name="exampleVietnamese"
                onChange={handleFormChangedData}
              />
            </div>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={() => handleSubmitForm(null)}>Save changes</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ToeicCreateVocabularyModal;