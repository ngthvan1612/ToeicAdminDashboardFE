import React, { useEffect, useRef, useState } from "react"
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
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { createToeicFullTest } from "src/api/toeicFullTest"
import { useNavigate, useParams } from "react-router-dom";
import { addWordAudio, deleteWordAudioById, getWordDetailByWordId, updateWordInformationByWordId } from "src/api/toeicVocabSystem";
import { resolveBackendUrl } from "src/api/axios";
import ButtonGroups from "../buttons/button-groups/ButtonGroups";
import { Modal } from "@coreui/coreui";

const AddNewAudioModal = (props) => {
  const [visible, setVisible] = useState(false)
  const [voice, setVoice] = useState('');
  const audioRef = useRef();
  const params = useParams();
  const { wordId } = params;

  const onUploadedAudioSuccess = props.onUploadedAudioSuccess ?? function() { };

  const handleSubmitAddNewAudio = (e) => {
    if (e)
      e.preventDefault();
    if (audioRef.current.files.length == 0) {
      alert('Ban chua chon file');
      return;
    }

    addWordAudio(wordId, voice.trim(), audioRef.current.files[0])
      .then(resp => {
        onUploadedAudioSuccess();
        setVisible(false);
      })
      .catch(err => {
        const message = err.response.data.message;
        alert(message);
      })
  }

  useEffect(() => {
    setVoice('');
    if (audioRef.current != null) {
      audioRef.current.value = null;
    }
  }, [visible])

  return (
    <>
      <CButton size="sm" color="success" className="text-white" onClick={() => setVisible(!visible)}>Add new audio</CButton>
      <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Add new audio</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm
            onSubmit={(e) => handleSubmitAddNewAudio(e)}
          >
            <div className="mb-3">
              <CFormLabel>Voice</CFormLabel>
              <CFormInput
                type="text"
                placeholder="John"
                value={voice}
                onChange={(e) => setVoice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <CFormLabel>File (*.wav, *.mp3)</CFormLabel>
              <CFormInput
                type="file"
                placeholder="John"
                accept=".wav,.mp3"
                ref={audioRef}
              />
            </div>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={() => handleSubmitAddNewAudio(null)}>Save changes</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}


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

  const handleChangeWordInformationFormData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setWord({
      ...word,
      [name]: value
    })
  }

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

  const handleUpdateInformation = (e) => {
    e.preventDefault();

    const data = {...word};
    delete data.audio;
    updateWordInformationByWordId(wordId, data)
      .then(() => refreshDataAsync())
      .catch((err) => alert(err.response.data.message));
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
            onSubmit={(e) => handleUpdateInformation(e)}
          >
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">English</CFormLabel>
              <CFormInput
                type="text"
                placeholder="Hello"
                value={word.english}
                disabled={isLoading}
                name="english"
                onChange={handleChangeWordInformationFormData}
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Vietnamese</CFormLabel>
              <CFormInput
                type="text"
                placeholder="Xin chào"
                value={word.vietnamese}
                name="vietnamese"
                onChange={handleChangeWordInformationFormData}
                disabled={isLoading}
              />
            </div>

            {/* TODO: them cai bang IPA */}
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Pronounce</CFormLabel>
              <CFormInput
                type="text"
                placeholder="/abc/"
                name="pronounce"
                value={word.pronounce}
                disabled={isLoading}
                onChange={handleChangeWordInformationFormData}
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Example English</CFormLabel>
              <CFormInput
                type="text"
                placeholder="Example"
                name="exampleEnglish"
                value={word.exampleEnglish}
                disabled={isLoading}
                onChange={handleChangeWordInformationFormData}
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Example Vietnamese</CFormLabel>
              <CFormInput
                type="text"
                placeholder="Đây là ví dụ"
                name="exampleVietnamese"
                value={word.exampleVietnamese}
                disabled={isLoading}
                onChange={handleChangeWordInformationFormData}
              />
            </div>

            <div className="mb-3 text-center">
              <CButton type="submit" color="success" style={{color: 'white'}}
                disabled={isLoading}>
                {isLoading && <><CSpinner size="sm"/>&nbsp;</>}
                Save changes
              </CButton>
            </div>
          </CForm>
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardHeader>
          <strong>Edit audio</strong>
        </CCardHeader>
        <CCardBody>
          <AddNewAudioModal
            onUploadedAudioSuccess={refreshDataAsync}
          />
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
                            <CButton size="sm" color="danger" className="text-white"
                              onClick={() => {
                                if (confirm("Bạn có chắc chắn xóa âm thanh này?")) {
                                  deleteWordAudioById(item.audioId)
                                    .then(() => refreshDataAsync())
                                    .catch((err) => alert(err.response.data.message));
                                }
                              }}
                            >Delete</CButton>
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
