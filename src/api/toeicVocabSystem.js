import { contextInstance } from "./axios";

const getListTopics = async() => {
  return contextInstance.get('/api/toeic/toeic-system-vocabulary/topic');
}

export {
  getListTopics
}
