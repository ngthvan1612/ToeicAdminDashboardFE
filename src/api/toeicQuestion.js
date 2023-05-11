import { contextInstance } from "./axios";

const getToeicQuestion = async () => {
  return await contextInstance.get("api/toeic/toeic-question");
};
const getToeicQuestionById = async (id) => {
  return await contextInstance.get(`api/toeic/toeic-question/${id}`);
};
const getToeicQuestionByPartId = async (partId) => {
  return await contextInstance.get(`api/toeic/toeic-question-group/get-groups-by-part/${partId}`);
};
const createToeicQuestion = async ({questionNumber, content, toeicAnswers, correctAnswer, toeicQuestionGroupId, }) => {
  return await contextInstance.post(`api/toeic/toeic-question/create-new-question`, {
    questionNumber, 
    content, 
    toeicAnswers, 
    correctAnswer,
    toeicQuestionGroupId
  });
};
const createToeicQuestionItem2 = async ({contentType, stringContent, content, questionContentId, questionTranscriptId}) => {
  return await contextInstance.post(`api/toeic/toeic-item-content/create-new-item-content`, {
  contentType, 
  stringContent, 
  content, 
  questionContentId, 
  questionTranscriptId
});
};
export { getToeicQuestion, getToeicQuestionById, getToeicQuestionByPartId, createToeicQuestion };
