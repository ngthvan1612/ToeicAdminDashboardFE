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

const Dashboard = () => {
  console.log("hihi");
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
  if (isLoading) return <>loading</>;
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
              <CButton onClick={() => navigate("/test-manager/tests/create")}>
                Create New
              </CButton>
              <CButton
                onClick={() => navigate("/test-manager/tests/backup")}
                style={{ marginLeft: "5px" }}
              >
                Backup
              </CButton>
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
                              to={`/test-manager/tests/${test.id}`}
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
