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
import { getToeicPartByTestId } from "src/api/toeicPart";
import { Link, useNavigate, useParams } from "react-router-dom";

const ToeicFullTestViewPart = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [partInfo, setPartInfo] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    let partItem;
    setIsLoading(true);
    getToeicPartByTestId(params.toeicFullTestId).then((resp) => {
      const rawData = resp.data.data;
      partItem = rawData.find((part) => part.partNumber == params.partId);
      setPartInfo(partItem);

      setIsLoading(false);
    });
  }, []);

  if (!partInfo) return <>loading..</>;
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>{partInfo.toeicFullTestEntity.fullName}</strong>
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
                  {/* test part */}
                  <CTableRow>
                    <CTableHeaderCell scope="row" className="col-md-1">
                      1
                    </CTableHeaderCell>
                    <CTableDataCell className="col-md-4">
                      Part {partInfo.partNumber}
                    </CTableDataCell>

                    <CTableDataCell className="col-md-2">
                      <CButton
                        size="sm"
                        color="success"
                        style={{ marginRight: "5px" }}
                      >
                        <Link
                          to={`/test-manager/tests/${params.toeicFullTestId}/collections/${params.partId}/questions`}
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
                          to={`/test-manager/tests/update/${params.partId}`}
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
