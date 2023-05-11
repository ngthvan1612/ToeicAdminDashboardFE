import { contextInstance } from "./axios";

const createToeicQuestionItem = async ({contentType, stringContent, content, questionContentId, questionTranscriptId}) => {
  const formData = new FormData();

  formData.append("contentType", contentType);
  formData.append("stringContent", stringContent);
  formData.append("content", content ?? null);
  formData.append("questionContentId", questionContentId ?? 0);
  formData.append("questionTranscriptId", questionTranscriptId ?? 0);

  return await contextInstance.post(
    `api/toeic/toeic-item-content/create-new-item-content`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
};

export { createToeicQuestionItem }
