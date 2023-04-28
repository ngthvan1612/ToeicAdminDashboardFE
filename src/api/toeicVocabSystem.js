import { contextInstance } from "./axios";

const getListTopics = async() => {
  return contextInstance.get(`/api/toeic/toeic-system-vocabulary/topic`);
}

const getListWordsByTopicId = async(topicId) => {
  return contextInstance.get(`/api/toeic/toeic-system-vocabulary/word/list-by-topic/${topicId}`);
}

const getWordDetailByWordId = async(wordId) => {
  return contextInstance.get(`/api/toeic/toeic-system-vocabulary/word/${wordId}`);
}

export {
  getListTopics,
  getListWordsByTopicId,
  getWordDetailByWordId
}
