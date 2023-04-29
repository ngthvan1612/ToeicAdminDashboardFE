import React, { useEffect, useRef, useState } from "react";
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
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
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
} from "@coreui/react";
import { listToeicFullTests } from "src/api/toeicFullTest";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createTopic, getListTopics, restoreVocabularyDatabase } from "src/api/toeicVocabSystem";
import { resolveBackendUrl } from "src/api/axios";


const AddNewTopicModal = (props) => {
  const [visible, setVisible] = useState(false)
  const [topicName, setTopicName] = useState('');
  const [imageDisplay, setImageDisplay] = useState(null);

  const imageSelectionRef = useRef();

  const onCreatedSuccessfully = props.onCreatedSuccessfully ?? function () { };

  const handleCreateTopic = (e) => {
    if (e) {
      e.preventDefault();
    }

    if (!topicName.trim()) {
      alert('Topic name cannot be null');
      return;
    }

    if (imageSelectionRef.current.files.length == 0) {
      alert('Please select topic image');
      return;
    }

    const topicImage = imageSelectionRef.current.files[0];

    createTopic(topicName, topicImage)
      .then(() => onCreatedSuccessfully())
      .catch(err => alert(err.response.data.message));
  }

  return (
    <>
      <CButton size="sm" color="success" className="text-white" onClick={() => setVisible(!visible)}>Add topic</CButton>
      <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Add topic</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm
            onSubmit={(e) => handleCreateTopic(e)}
          >
            <div className="mb-3">
              <CFormLabel>Voice</CFormLabel>
              <CFormInput
                type="text"
                placeholder="Home"
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <CFormLabel>Topic image</CFormLabel>
              <CFormInput
                type="file"
                placeholder="John"
                accept="image/*"
                ref={imageSelectionRef}
                onChange={(e) => {
                  if (e.target.files.length == 1) {
                    const imageFile = e.target.files[0];
                    setImageDisplay(URL.createObjectURL(imageFile));
                  }
                }}
              />
              <img
                className="mt-3"
                src={imageDisplay}
                style={{
                  maxWidth: '100%'
                }}
              />
            </div>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={() => handleCreateTopic(null)}>Save changes</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

const BackupVocabularyModal = (props) => {
  const [visible, setVisible] = useState(false)
  const [backuping, setBackuping] = useState(false);
  const [progress, setProgress] = useState(0);
  const backupFileRef = useRef();
  const onBackupSuccessfully = props.onBackupSuccessfully ?? function() { }

  const handleRestoreDatabase = () => {
    if (backupFileRef.current == null)
      return;

    const files = backupFileRef.current.files;

    if (files.length == 0) {
      alert('Please select backup file!');
      return;
    }

    const file = files[0];

    setBackuping(true);

    restoreVocabularyDatabase(file, (e) => {
      const progressIntegerValue = Math.floor((e.progress + 0.001) * 100);
      setProgress(progressIntegerValue);
    })
      .then(() => {
        onBackupSuccessfully();
        setBackuping(false);
      })
      .catch(err => {
        alert(err.response.data.message);
        setBackuping(false);
      });
  }

  useEffect(() => {
    if (backupFileRef.current != null) {
      backupFileRef.current.value = null;
    }
  }, [visible])

  return (
    <>
      <CButton size="sm" color="primary" className="text-white" style={{ marginLeft: 5 }} onClick={() => setVisible(!visible)}>Restore database</CButton>
      <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader
          closeButton={!backuping}
        >
          <CModalTitle>
            Restore database
            {backuping && <>
              &nbsp;<CSpinner size="sm" />
            </>}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="mb-3">
            <CFormLabel>Backup file (*.zip)</CFormLabel>
            <CFormInput
              type="file"
              accept=".zip"
              disabled={backuping}
              ref={backupFileRef}
            />
          </div>
          <div className="mb-3">
            <CProgress>
              <CProgressBar value={progress} animated variant="striped">
                {progress > 98 ? <>Processing...</> : <>{progress} %</>}
              </CProgressBar>
            </CProgress>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary" onClick={() => setVisible(false)}
            disabled={backuping}
          >
            Close
          </CButton>
          <CButton
            color="primary"
            onClick={() => handleRestoreDatabase()}
            disabled={backuping}
          >
            Backup
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

const ToeicListVocabTopics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [vocabTopics, setVocabTopics] = useState([]);
  const navigate = useNavigate();

  const refreshListTopics = () => {
    setIsLoading(true);
    getListTopics().then((resp) => {
      const rawData = resp.data.data;
      setVocabTopics([...rawData]);
      setIsLoading(false);
    }).catch(err => setIsLoading(false));
  }

  useEffect(() => {
    refreshListTopics();
  }, []);

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Vocabulary Topics Manager</strong>
        </CCardHeader>
        <CCardBody>
          {isLoading ? (
            <CSpinner />
          ) : (
            <>
              <AddNewTopicModal
                onCreatedSuccessfully={refreshListTopics}
              />
              <BackupVocabularyModal
                onBackupSuccessfully={refreshListTopics}
              />
              <CTable striped hover className="align-middle text-center">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Topic name</CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {vocabTopics.map((topic, order) => {
                    return (
                      <CTableRow>
                        <CTableHeaderCell scope="row" className="col-xs-auto">
                          {order + 1}
                        </CTableHeaderCell>
                        <CTableDataCell className="col-md-auto">
                          <div class="row">
                            <div class="column-md-12">
                              {topic.topicName}
                            </div>
                          </div>
                        </CTableDataCell>
                        <CTableDataCell className="col-md-auto">
                          <img
                            loading="lazy"
                            alt={topic.topicName + '-image'}
                            src={resolveBackendUrl(topic.topicImageUrl)}
                            style={{
                              maxWidth: 240,
                              height: 120,
                              minHeight: 120
                            }}
                          />
                        </CTableDataCell>
                        <CTableDataCell className="col-xs-auto">
                          <div className="btn-group">
                            <CButton
                              size="sm"
                              color="success"
                              style={{ marginRight: "5px" }}
                            >
                              <Link
                                to={`/vocab-manager/topics/${topic.topicId}`}
                                style={{ color: "white", textDecoration: "none" }}
                              >
                                View
                              </Link>
                            </CButton>
                            <CButton
                              size="sm"
                              color="danger"
                              style={{ color: "white" }}
                            >
                              Delete
                            </CButton>
                          </div>
                        </CTableDataCell>
                      </CTableRow>
                    );
                  })}
                </CTableBody>
              </CTable>
            </>
          )}
        </CCardBody>
      </CCard>
    </>
  );
};

export default ToeicListVocabTopics;
