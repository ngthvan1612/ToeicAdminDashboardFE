import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { getToeicPart, getToeicPartByTestId } from "src/api/toeicPart";
import { Link, useNavigate, useParams } from "react-router-dom";

const ToeicFullTestAllParts = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [parts, setParts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getToeicPartByTestId(params.toeicFullTestId).then((resp) => {
      const rawData = resp.data.data;
      setParts([...rawData]);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <>loading..</>;
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>{parts[0].toeicFullTestEntity.fullName}</strong>
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
                  {parts.map((part, order) => {
                    return (
                      <CTableRow>
                        <CTableHeaderCell scope="row" className="col-md-1">
                          {order + 1}
                        </CTableHeaderCell>
                        <CTableDataCell className="col-md-4">
                          Part {part.partNumber}
                        </CTableDataCell>
                        <CTableDataCell className="col-md-4">
                          <CButton
                            size="sm"
                            color="success"
                            style={{ marginRight: "5px" }}
                          >
                            <Link
                              to={`/test-manager/tests/${params.toeicFullTestId}/part/${part.id}`}
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
                              to={`/test-manager/tests/update/${part.id}`}
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
