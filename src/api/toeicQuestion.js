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
const createToeicQuestion = async (groupId, questionNumber, content, correctAnswer, toeicChoices) => {
  return await contextInstance.post(`api/toeic/toeic-question/create-new-question`, {
    groupId, 
    questionNumber, 
    content, 
    correctAnswer, 
    toeicChoices
  });
};
export { getToeicQuestion, getToeicQuestionById, getToeicQuestionByPartId, createToeicQuestion };
