import React, { useEffect, useState } from "react"
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { createToeicFullTest } from "src/api/toeicFullTest"
import { useNavigate, useParams } from "react-router-dom";
import { getWordDetailByWordId } from "src/api/toeicVocabSystem";
import { resolveBackendUrl } from "src/api/axios";
import ButtonGroups from "../buttons/button-groups/ButtonGroups";

const ToeicWordDetail = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [word, setWord] = useState({
    english: '',
    vietnamese: '',
    audio: [],
    exampleEnglish: '',
    exampleVietnamese: '',
    pronounce: ''
  });

  const params = useParams();

  const { wordId } = params;

  const refreshDataAsync = async () => {
    setIsLoading(true);
    try {
      const wordResponse = await getWordDetailByWordId(wordId);
      const wordRaw = wordResponse.data.data;
      setWord({ ...wordRaw });
    }
    catch (e) {
      console.log('Có lỗi xảy ra!')
    }
    setIsLoading(false);
  }

  useEffect(() => {
    refreshDataAsync()
  }, [])

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Edit vocabulary information</strong>
        </CCardHeader>
        <CCardBody>
          <CForm

          >
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">English</CFormLabel>
              <CFormInput
                type="text"
                placeholder="Hello"
                value={word.english}
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Vietnamese</CFormLabel>
              <CFormInput
                type="text"
                placeholder="Xin chào"
                value={word.vietnamese}
              />
            </div>

            {/* TODO: them cai bang IPA */}
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Pronounce</CFormLabel>
              <CFormInput
                type="text"
                placeholder="Xin chào"
                value={word.pronounce}
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Example English</CFormLabel>
              <CFormInput
                type="text"
                placeholder="Xin chào"
                value={word.exampleEnglish}
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Example Vietnamese</CFormLabel>
              <CFormInput
                type="text"
                placeholder="Xin chào"
                value={word.exampleVietnamese}
              />
            </div>

            <div className="mb-3 text-center">
              <CButton type="submit" color="success" style={{color: 'white'}}>Save changes</CButton>
            </div>
          </CForm>
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardHeader>
          <strong>Edit audio</strong>
        </CCardHeader>
        <CCardBody>
          <CForm

          >
            <CTable className="vertical-middle text-center">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Voice</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Audio</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {word.audio.map(item => {
                  return (
                    <>
                      <CTableRow>
                        <CTableDataCell
                          className="col-md-3"
                        >
                          {item.voice}
                        </CTableDataCell>
                        <CTableDataCell
                        >
                          <audio controls preload="none">
                            <source src={resolveBackendUrl(item.url)}/>
                          </audio>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CButtonGroup>
                            <CButton size="sm" color="danger" className="text-white">Delete</CButton>
                          </CButtonGroup>
                        </CTableDataCell>
                      </CTableRow>
                    </>
                  )
                })}
              </CTableBody>
            </CTable>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  )
}

export default ToeicWordDetail
