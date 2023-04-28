import { CCard, CCardHeader, CCardBody } from "@coreui/react";
import { getToeicQuestionById } from "../../api/toeicQuestion";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ToeicMultipleQuestions = () => {
  const params = useParams();
  const [question, setQuestion] = useState();

  useEffect(() => {
    getToeicQuestionById(params.questionId).then((resp) => {
      const rawData = resp.data.data;
      console.log(rawData);
      setQuestion(rawData);
    });
  }, []);
  if (!question) {
    return <>loading</>;
  }
  return (
    <>
      <CCard>
        <CCardHeader>Question {question.questionNumber}</CCardHeader>
        <CCardBody>
          <h4>{question.content}</h4>
          <h5>Correct answer: {question.correctAnswer}</h5>
        </CCardBody>
      </CCard>
    </>
  );
};
export default ToeicMultipleQuestions;
