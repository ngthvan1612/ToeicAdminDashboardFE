import { contextInstance } from "./axios";

const getToeicQuestionGroup = async () => {
  return await contextInstance.get("api/toeic/toeic-question-group");
};
const getToeicQuestionGroupById = async (id) => {
  return await contextInstance.get(`api/toeic/toeic-question-group/${id}`);
};
export { getToeicQuestionGroup, getToeicQuestionGroupById };
