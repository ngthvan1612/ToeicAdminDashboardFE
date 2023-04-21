import React, { useState } from "react"
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import { createToeicFullTest } from "src/api/toeicFullTest"
import { useNavigate } from "react-router-dom";

const CreateToeicFullTest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [toeicFullTestModel, setToeicFullTestModel] = useState({
    fullName: ''
  })

  const navigate = useNavigate();

  const handleCreateToeicFullTest = (e) => {
    e.preventDefault();

    setIsLoading(true);
    createToeicFullTest(toeicFullTestModel)
      .then(resp => {
        navigate('/test-manager/tests')
        setIsLoading(false);
      })
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>Create Toeic Full Test</strong>
      </CCardHeader>
      <CCardBody>
        <CForm
          onSubmit={(e) => handleCreateToeicFullTest(e)}
        >
          <div className="mb-3">
            <CFormLabel htmlFor="exampleFormControlInput1">Full name</CFormLabel>
            <CFormInput
              type="text"
              placeholder="ETS 2019 Test 03"
              value={toeicFullTestModel.fullName}
              onChange={(e) => setToeicFullTestModel({...toeicFullTestModel, fullName: e.target.value})}
            />
          </div>
          <div className="mb-3">
            <CButton color='primary' type="submit">Create</CButton>
          </div>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default CreateToeicFullTest
