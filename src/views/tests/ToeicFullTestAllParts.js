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

const ToeicFullTestAllParts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [toeicFullTests, setToeicFullTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    listToeicFullTests().then((resp) => {
      const rawData = resp.data.data;
      setToeicFullTests([...rawData]);
      setIsLoading(false);
    });
  }, []);

  const testCollections = [
    {
      id: "1",
      testType: "Part 1",
      name: "Photographs",
    },
    {
      id: "2",
      testType: "Part 2",
      name: "Questions and response",
    },
    {
      id: "3",
      testType: "Part 3",
      name: "Conversations",
    },
    {
      id: "4",
      testType: "Part 4",
      name: "Short talks",
    },
    {
      id: "5",
      testType: "Part 5",
      name: "Incomplete sentences",
    },
    {
      id: "6",
      testType: "Part 6",
      name: "Text completion",
    },
    {
      id: "7",
      testType: "Part 7",
      name: "Reading comprehension",
    },
    {
      id: "8",
      testType: "Part 8",
      name: "Photographs",
    },
    {
      id: "9",
      testType: "Full test",
      name: "Full part of test",
    },
    {
      id: "10",
      testType: "Full test",
      name: "Full part of listening test",
    },
    {
      id: "11",
      testType: "Full test",
      name: "Full part reading test",
    },
  ];

  return (
    <>
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
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell
                      scope="col"
                      style={{ marginRight: "40px" }}
                    >
                      Actions
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {testCollections.map((test, order) => {
                    return (
                      <CTableRow>
                        <CTableHeaderCell scope="row" className="col-md-1">
                          {order + 1}
                        </CTableHeaderCell>
                        <CTableDataCell className="col-md-4">
                          {test.testType}
                        </CTableDataCell>
                        <CTableDataCell className="col-md-4">
                          {test.name}
                        </CTableDataCell>
                        <CTableDataCell className="col-md-4">
                          <CButton
                            size="sm"
                            color="success"
                            style={{ marginRight: "5px" }}
                          >
                            <Link
                              to={`/test-manager/tests/${test.id}/collections/${test.id}`}
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
                              to={`/test-manager/tests/update/${test.id}`}
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

export default ToeicFullTestAllParts;
