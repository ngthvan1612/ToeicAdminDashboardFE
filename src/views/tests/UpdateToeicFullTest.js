import React from "react"
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
import { useParams } from "react-router-dom"

const CreateToeicFullTest = () => {
  const params = useParams();
  const toeicFullTestId = params.toeicFullTestId;

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>Update Toeic Full Test [{toeicFullTestId}]</strong>
      </CCardHeader>
      <CCardBody>
        <CForm
          method="POST"
        >
          <div className="mb-3">
            <CFormLabel htmlFor="exampleFormControlInput1">Full name</CFormLabel>
            <CFormInput
              type="text"
              placeholder="ETS 2019 Test 03"
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
