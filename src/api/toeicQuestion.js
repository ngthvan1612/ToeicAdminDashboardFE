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
export { getToeicQuestion, getToeicQuestionById, getToeicQuestionByPartId };
