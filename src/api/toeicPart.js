import { contextInstance } from "./axios";

const getToeicPart = async () => {
  return await contextInstance.get("api/toeic/toeic-part");
};
const getToeicPartById = async (id) => {
  return await contextInstance.get(`api/toeic/toeic-part/${id}`);
};
const getToeicPartByTestId = async (id) => {
  return await contextInstance.get(`api/toeic/toeic-part/test/${id}`);
};
export { getToeicPart, getToeicPartById, getToeicPartByTestId };
