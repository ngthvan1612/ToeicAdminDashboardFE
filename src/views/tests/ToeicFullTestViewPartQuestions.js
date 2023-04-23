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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import { listToeicFullTests } from "src/api/toeicFullTest";
import { Link, useNavigate, useParams } from "react-router-dom";
import QuestionModal from "./QuestionModal";

const ToeicFullTestViewPartQuestions = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [toeicFullTests, setToeicFullTests] = useState([]);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    listToeicFullTests().then((resp) => {
      const rawData = resp.data.data;
      setToeicFullTests([...rawData]);
      setIsLoading(false);
    });
  }, []);

  const testQuestionList = [
    {
      question: "question 1",
      answer: "A",
    },
    {
      question: "question 1",
      answer: "A",
    },
    {
      question: "question 1",
      answer: "A",
    },
    {
      question: "question 1",
      answer: "A",
    },

    {
      question: "question 1",
      answer: "A",
    },
    {
      question: "question 1",
      answer: "A",
    },
    {
      question: "question 1",
      answer: "A",
    },
    {
      question: "question 1",
      answer: "A",
    },
    {
      question: "question 1",
      answer: "A",
    },
    {
      question: "question 1",
      answer: "A",
    },
  ];

  return (
    <>
      <QuestionModal visible={visible} />
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Toeic Full Test Manager</strong>
        </CCardHeader>
        <CCardBody>
          {isLoading ? (
            <CSpinner />
          ) : (
            <>
              <CTable striped hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Test Type</CTableHeaderCell>
                    <CTableHeaderCell
                      scope="col"
                      style={{ marginRight: "40px" }}
                    >
                      Actions
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {testQuestionList.map((question, order) => {
                    return (
                      <CTableRow>
                        <CTableHeaderCell scope="row" className="col-md-1">
                          {order + 1}
                        </CTableHeaderCell>
                        <CTableDataCell className="col-md-4">
                          {question.question}
                        </CTableDataCell>

                        <CTableDataCell className="col-md-2">
                          <CButton
                            size="sm"
                            color="success"
                            style={{ marginRight: "5px" }}
                            onClick={() => setVisible(!visible)}
                          >
                            <Link
                              // to={`/test-manager/tests/1/collections/1`}
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
                              to={`/test-manager/tests/update/1`}
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

export default ToeicFullTestViewPartQuestions;
