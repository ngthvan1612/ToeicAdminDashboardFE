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

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [toeicFullTests, setToeicFullTests] = useState([]);

  const params = useParams();

  const toeicFullTestId = params.toeicFullTestId;

  useEffect(() => {
    setIsLoading(true);
    getToeicPartByTestId(params.toeicFullTestId).then((resp) => {
      const rawData = resp.data.data;
      setTestCollections([...rawData]);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Test [{toeicFullTestId}]</strong>
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
                    <CTableHeaderCell scope="col">Full name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Slug</CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {toeicFullTests.map((test, order) => {
                    return (
                      <CTableRow>
                        <CTableHeaderCell scope="row" className="col-md-1">
                          {order + 1}
                        </CTableHeaderCell>
                        <CTableDataCell className="col-md-4">
                          {test.fullName}
                        </CTableDataCell>
                        <CTableDataCell className="col-md-4">
                          {test.slug}
                        </CTableDataCell>
                        <CTableDataCell className="col-md-2">
                          <CButton
                            size="sm"
                            color="success"
                            style={{ marginRight: "5px" }}
                          >
                            <Link
                              to={`/test-manager/tests/${test.id}/collections`}
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

export default Dashboard;
