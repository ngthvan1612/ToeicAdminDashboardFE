import { contextInstance } from "./axios";

const getToeicQuestionGroup = async () => {
  return await contextInstance.get("api/toeic/toeic-question-group");
};

const getToeicQuestionGroupById = async (id) => {
  return await contextInstance.get(`api/toeic/toeic-question-group/${id}`);
};

const ToeicQuestionGroupsByPartId = async(partId) => {
  return await contextInstance.get(`/api/toeic/toeic-question-group/get-groups-by-part/${partId}`)
}

export { getToeicQuestionGroup, getToeicQuestionGroupById, ToeicQuestionGroupsByPartId };
