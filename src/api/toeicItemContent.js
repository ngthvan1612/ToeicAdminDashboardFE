import { contextInstance } from "./axios";

const createToeicQuestionItem = async ({contentType, stringContent, content, questionContentId, questionTranscriptId}) => {
    return await contextInstance.post(`api/toeic/toeic-item-content/create-new-item-content`, {
    contentType, 
    stringContent, 
    content, 
    questionContentId, 
    questionTranscriptId
  });
};
export { createToeicQuestionItem };