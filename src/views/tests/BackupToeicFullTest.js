import React, { useRef, useState } from "react"
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CLink,
  CNavLink,
  CProgress,
  CProgressBar,
  CRow,
  CSpinner,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { backupToeicFullTestWithProgress } from "src/api/toeicFullTest";
import { useNavigate } from "react-router-dom";

const BackupToeicFullTest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const uploadFileRef = useRef();
  const [currentDownloadPercent, setCurrentDownloadPercent] = useState(0);
  const navigate = useNavigate();

  const handleUploadBackupFullTest = (e) => {
    e.preventDefault();
    if (isLoading)
      return;

    if (uploadFileRef.current.files.length == 0) {
      alert('Please select file');
      return;
    }

    setCurrentDownloadPercent(0);

    setIsLoading(true);
    const file = uploadFileRef.current.files[0];
    backupToeicFullTestWithProgress(file, (e) => {
      const { progress: percentFloat } = e;
      let percentInteger = Math.floor(percentFloat * 100);
      if (percentFloat >= 0.98)
        percentInteger = 100;
      setCurrentDownloadPercent(percentInteger);
    }).then(() => {
      navigate('/test-manager/tests')
    })
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Toeic Full Test Manager</strong>
        </CCardHeader>
        <CCardBody>
          <CForm
            onSubmit={(e) => handleUploadBackupFullTest(e)}
          >
            <div
              className="mb-3"
            >
              <CFormLabel htmlFor="formFile">Please select backup file</CFormLabel>
              <CFormInput
                type="file"
                accept=".zip"
                ref={uploadFileRef}
                disabled={isLoading}
              />
            </div>
            <div className="mb-3">
              <CButton
                type="submit"
                disabled={isLoading}
              >
                <CSpinner
                  component="span"
                  size="sm"
                  aria-hidden="true"
                  style={{
                    display: isLoading ? 'inline-block' : 'none'
                  }}
                />
                {isLoading && <>&nbsp; &nbsp;</>}Backup
              </CButton>
            </div>
            <div
              className="mb-3"
              style={{
                display: isLoading ? 'block' : 'none'
              }}
            >
              <CProgress>
                <CProgressBar value={currentDownloadPercent} color='success' animated variant="striped">
                  {currentDownloadPercent === 100 ? <span style={{
                    fontWeight: 'bold',
                    color: 'yellow'
                  }}n>Processing....</span> : <span style={{
                    fontWeight: 'bold',
                    color: 'yellow'
                  }}>{currentDownloadPercent}%</span>}
                </CProgressBar>
              </CProgress>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  )
}

export default BackupToeicFullTest