import { contextInstance } from "./axios";

const getToeicQuestion = async () => {
  return await contextInstance.get("api/toeic/toeic-question");
};
const getToeicQuestionByPartId = async (partId) => {
  return await contextInstance.get(`api/toeic/toeic-question/${partId}`);
};
export { getToeicQuestion };
