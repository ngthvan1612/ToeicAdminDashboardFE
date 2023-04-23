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

const ToeicFullTestViewPart = () => {
  const params = useParams();
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

  const testPartList = [
    {
      name: "Photographs",
      partId: params.partId,
      id: 1,
    },
    {
      name: "Photographs",
      partId: params.partId,
      id: 2,
    },
    {
      name: "Photographs",
      partId: params.partId,
      id: 3,
    },
    {
      name: "Photographs",
      partId: params.partId,
      id: 4,
    },
    {
      name: "Photographs",
      partId: params.partId,
      id: 5,
    },
    {
      name: "Photographs",
      partId: params.partId,
      id: 6,
    },
    {
      name: "Photographs",
      partId: params.partId,
      id: 7,
    },
    {
      name: "Photographs",
      partId: params.partId,
      id: 8,
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
                    <CTableHeaderCell
                      scope="col"
                      style={{ marginRight: "40px" }}
                    >
                      Actions
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {testPartList.map((test, order) => {
                    return (
                      <CTableRow>
                        <CTableHeaderCell scope="row" className="col-md-1">
                          {order + 1}
                        </CTableHeaderCell>
                        <CTableDataCell className="col-md-4">
                          {test.name + " " + test.id}
                        </CTableDataCell>

                        <CTableDataCell className="col-md-2">
                          <CButton
                            size="sm"
                            color="success"
                            style={{ marginRight: "5px" }}
                          >
                            <Link
                              to={`/test-manager/tests/${test.id}/collections/${test.id}/questions`}
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

export default ToeicFullTestViewPart;
