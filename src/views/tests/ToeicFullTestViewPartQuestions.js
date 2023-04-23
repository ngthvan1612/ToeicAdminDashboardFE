import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CSpinner,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { getToeicQuestion } from "src/api/toeicQuestion";
import { Link, useNavigate, useParams } from "react-router-dom";
import QuestionModal from "./QuestionModal";
import {
  getToeicQuestionGroup,
  getToeicQuestionGroupById,
} from "src/api/toeicQuestionGroup";

const ToeicFullTestViewPartQuestions = () => {
  const params = useParams();
  console.log(params);
  const [isLoading, setIsLoading] = useState(true);
  const [questionList, setQuestionList] = useState();
  const [questionGroupList, setQuestionGroupList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    if (params.partId == 3) {
      getToeicQuestionGroup().then((resp) => {
        const rawData = resp.data.data;
        const groupEntityList = rawData.filter(
          (data) => data.toeicPartEntity.partNumber == params.partId
        );
        groupEntityList.map((item) => {
          getToeicQuestionGroupById(item.id).then((res) => {
            const groupData = res.data.data;
            // questionGroupList.push(groupData);
            setQuestionGroupList((questionGroupList) => [
              ...questionGroupList,
              groupData,
            ]);
          });
        });
      });

      setIsLoading(false);
    } else {
      getToeicQuestion().then((resp) => {
        const rawData = resp.data.data;
        const questionByPart = rawData.filter(
          (data) =>
            data.toeicQuestionGroupEntity.toeicPartEntity.partNumber ==
            params.partId
        );
        const questionByPartAndTestId = questionByPart.filter(
          (data) =>
            data.toeicQuestionGroupEntity.toeicPartEntity.toeicFullTestEntity
              .id == params.toeicFullTestId
        );
        setQuestionList(questionByPartAndTestId);
        setIsLoading(false);
      });
    }
  }, []);
  if (isLoading) return <>d</>;

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
                  {params.partId == 3 ? (
                    <>
                      {questionGroupList.map((questionGroup, order) => {
                        return (
                          <CTableRow>
                            <CTableHeaderCell scope="row" className="col-md-1">
                              {order + 1}
                            </CTableHeaderCell>
                            <CTableDataCell className="col-md-4">
                              Question{" "}
                              {questionGroup.questions.map(
                                (question) => question.questionNumber + "   "
                              )}
                            </CTableDataCell>

                            <CTableDataCell className="col-md-2">
                              <CButton
                                size="sm"
                                color="success"
                                style={{ marginRight: "5px" }}
                              >
                                <Link
                                  to={`/test-manager/tests/${params.toeicFullTestId}/group/${params.partId}/questions/group/${questionGroup.id}`}
                                  style={{
                                    color: "white",
                                    textDecoration: "none",
                                  }}
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
                                  style={{
                                    color: "white",
                                    textDecoration: "none",
                                  }}
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
                    </>
                  ) : (
                    <>
                      {/* {questionList.map((question, order) => {
                        return (
                          <CTableRow>
                            <CTableHeaderCell scope="row" className="col-md-1">
                              {order + 1}
                            </CTableHeaderCell>
                            <CTableDataCell className="col-md-4">
                              Question {question.questionNumber}
                            </CTableDataCell>

                            <CTableDataCell className="col-md-2">
                              <CButton
                                size="sm"
                                color="success"
                                style={{ marginRight: "5px" }}
                              >
                                <Link
                                  to={`/test-manager/tests/${params.toeicFullTestId}/group/${params.partId}/questions/${question.id}`}
                                  style={{
                                    color: "white",
                                    textDecoration: "none",
                                  }}
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
                                  style={{
                                    color: "white",
                                    textDecoration: "none",
                                  }}
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
                      })} */}
                    </>
                  )}
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
