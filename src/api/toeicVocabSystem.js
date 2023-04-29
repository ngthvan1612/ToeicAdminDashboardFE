import { contextInstance } from "./axios";

const addWordAudio = async(wordId, voice, audioFile) => {
  const requestFormData = new FormData();
  requestFormData.append("voice", voice);
  requestFormData.append("file", audioFile);
  return contextInstance.post(`/api/toeic/toeic-system-vocabulary/word/${wordId}/add-audio`, requestFormData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

const createTopic = async(topicName, topicImage) => {
  const requestFormData = new FormData();

  requestFormData.append("topicName", topicName);
  requestFormData.append("image", topicImage);

  return contextInstance.post(`/api/toeic/toeic-system-vocabulary/topic`, requestFormData, {
    headers: {
      'Content-Type': 'multipart/form-data'
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
  createTopic,
  createWord,
  addWordAudio,
  getListTopics,
  getListWordsByTopicId,
  getWordDetailByWordId,
  updateWordInformationByWordId,
  deleteWordAudioById,
  deleteWordById
}
