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
import { Link, useNavigate } from "react-router-dom";
import { getListTopics } from "src/api/toeicVocabSystem";
import { resolveBackendUrl } from "src/api/axios";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [vocabTopics, setVocabTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getListTopics().then((resp) => {
      const rawData = resp.data.data;
      setVocabTopics([...rawData]);
      setIsLoading(false);
    });
  }, []);
  if (isLoading) return <>loading</>;
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
              <CButton size="sm">
                Create New
              </CButton>
              <CButton
                size="sm"
                style={{ marginLeft: "5px" }}
              >
                Backup
              </CButton>
              <CTable striped hover>
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
                        <CTableHeaderCell scope="row" className="col-md-1">
                          {order + 1}
                        </CTableHeaderCell>
                        <CTableDataCell className="col-md-4">
                          {topic.topicName}
                        </CTableDataCell>
                        <CTableDataCell className="col-md-4">
                          <img
                            alt={topic.topicName + '-image'}
                            src={resolveBackendUrl(topic.topicImageUrl)}
                            style={{
                              maxWidth: 240,
                              height: 120,
                              minHeight: 120
                            }}
                          />
                        </CTableDataCell>
                        <CTableDataCell className="col-md-2">
                          <CButton
                            size="sm"
                            color="success"
                            style={{ marginRight: "5px" }}
                          >
                            <Link
                              to={`/test-manager/tests/${topic.id}`}
                              style={{ color: "white", textDecoration: "none" }}
                            >
                              View
                            </Link>
                          </CButton>
                          <CButton
                            size="sm"
                            color="warning"
                            style={{ marginRight: "5px" }}
                          >
                            <Link
                              to={`/test-manager/tests/update/${topic.id}`}
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

export default Dashboard;
