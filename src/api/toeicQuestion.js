import { contextInstance } from "./axios";

const getToeicQuestion = async () => {
  return await contextInstance.get("api/toeic/toeic-question");
};
const getToeicQuestionById = async (id) => {
  return await contextInstance.get(`api/toeic/toeic-question/${id}`);
};
const getToeicQuestionByPartId = async (partId) => {
  return await contextInstance.get(`api/toeic/toeic-question/${partId}`);
};
export { getToeicQuestion, getToeicQuestionById };
