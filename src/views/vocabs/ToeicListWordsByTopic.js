import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CLink,
  CNavLink,
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
import { getListTopics, getListWordsByTopicId } from "src/api/toeicVocabSystem";
import { resolveBackendUrl } from "src/api/axios";

const ToeicListWordsByTopic = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [wordList, setWordList] = useState([]);
  const [topic, setTopic] = useState({});
  const navigate = useNavigate();
  const params = useParams();

  const { topicId } = params;

  useEffect(() => {
    setIsLoading(true);
    getListWordsByTopicId(topicId).then((resp) => {
      const rawData = resp.data.data;
      const { wordList, topic } = rawData;
      setWordList([...wordList]);
      setTopic({ ...topic });
      setIsLoading(false);
    });
  }, []);
  if (isLoading) return <>loading</>;
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Topic: {topic.topicName}</strong>
        </CCardHeader>
        <CCardBody>
          {isLoading ? (
            <CSpinner />
          ) : (
            <>
              <CButton size="sm">
                Create new vocabulary
              </CButton>
              <CTable striped hover className="align-middle text-center">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">English</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Vietnamese</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {wordList.map((word, order) => {
                    return (
                      <CTableRow>
                        <CTableHeaderCell scope="row" className="col-md-auto">
                          {order + 1}
                        </CTableHeaderCell>
                        <CTableDataCell className="col-md-4">
                          {word.english}
                        </CTableDataCell>
                        <CTableDataCell className="col-md-4">
                          {word.vietnamese}
                        </CTableDataCell>
                        <CTableDataCell className="col-md-4">
                          <img
                            alt={word.english + '-image'}
                            src={resolveBackendUrl(word.imageUrl)}
                            style={{
                              maxWidth: 240,
                              height: 120,
                              minHeight: 120
                            }}
                          />
                        </CTableDataCell>
                        <CTableDataCell className="col-md-auto">
                          <div className="btn-group">
                            <CButton
                              size="sm"
                              color="success"
                              style={{ marginRight: "5px" }}
                            >
                              <Link
                                to={`/vocab-manager/topics/${topic.topicId}/words/${word.id}`}
                                style={{ color: "white", textDecoration: "none" }}
                              >
                                Update
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

export default ToeicListWordsByTopic;
