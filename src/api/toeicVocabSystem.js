import { contextInstance } from "./axios";

const addWordAudio = async(wordId, voice, audioFile) => {
  const uploadFormData = new FormData();
  uploadFormData.append("voice", voice);
  uploadFormData.append("file", audioFile);
  return contextInstance.post(`/api/toeic/toeic-system-vocabulary/word/${wordId}/add-audio`, uploadFormData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

const createWord = async(word) => {
  return contextInstance.post(`/api/toeic/toeic-system-vocabulary/word`, word);
}

const getListTopics = async() => {
  return contextInstance.get(`/api/toeic/toeic-system-vocabulary/topic`);
}

const getListWordsByTopicId = async(topicId) => {
  return contextInstance.get(`/api/toeic/toeic-system-vocabulary/word/list-by-topic/${topicId}`);
}

const getWordDetailByWordId = async(wordId) => {
  return contextInstance.get(`/api/toeic/toeic-system-vocabulary/word/${wordId}`);
}

const updateWordInformationByWordId = async(wordId, data) => {
  return contextInstance.put(`/api/toeic/toeic-system-vocabulary/word/${wordId}`, data);
}

const deleteWordAudioById = async(audioId) => {
  return contextInstance.delete(`/api/toeic/toeic-system-vocabulary/audio/${audioId}`);
}

const deleteWordById = async(wordId) => {
  return contextInstance.delete(`/api/toeic/toeic-system-vocabulary/word/${wordId}`);
}

export {
  createWord,
  addWordAudio,
  getListTopics,
  getListWordsByTopicId,
  getWordDetailByWordId,
  updateWordInformationByWordId,
  deleteWordAudioById,
  deleteWordById
}
