import React, { useEffect, useState } from "react"
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
  CSpinner,
} from '@coreui/react'
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { getToeicFullTestById, updateToeicFullTest } from "src/api/toeicFullTest";

const CreateToeicFullTest = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [toeicFullTestModel, setToeicFullTestModel] = useState({});
  const navigate = useNavigate();

  const params = useParams();
  const toeicFullTestId = params.toeicFullTestId;

  useEffect(() => {
    setIsLoading(true);
    getToeicFullTestById(toeicFullTestId)
      .then(resp => {
        const rawData = resp.data.data;
        setToeicFullTestModel({...rawData});
        setIsLoading(false);
      })
  }, []);

  const handleUpdateToeicFullTest = (e) => {
    e.preventDefault();

    setIsLoading(true);
    updateToeicFullTest(toeicFullTestModel)
      .then(resp => {
        setIsLoading(false);
        navigate('/test-manager/tests');
      })
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Update Toeic Full Test [{toeicFullTestId}]</strong>
        </CCardHeader>
        <CCardBody>
          {isLoading ? <CSpinner /> : (
            <CForm
              onSubmit={(e) => handleUpdateToeicFullTest(e)}
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
                <CButton color='primary' type="submit">Update</CButton>
              </div>
            </CForm>
          )}

        </CCardBody>
      </CCard>
    </>
  )
}

export default CreateToeicFullTest
