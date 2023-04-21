import { contextInstance } from "./axios";

const createToeicFullTest = async(toeicFullTest) => {
  return await contextInstance.post(`api/toeic/toeic-full-test`, toeicFullTest)
}

const getToeicFullTestById = async(id) => {
  return await contextInstance.get(`api/toeic/toeic-full-test/${id}`)
}

const listToeicFullTests = async () => {
  return await contextInstance.get(`api/toeic/toeic-full-test`);
}

const updateToeicFullTest = async(toeicFullTest) => {
  return await contextInstance.put(`api/toeic/toeic-full-test/${toeicFullTest.id}`, toeicFullTest)
}

export {
  listToeicFullTests,
  getToeicFullTestById,
  createToeicFullTest,
  updateToeicFullTest
}
