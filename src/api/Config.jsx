import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000"
});

export const getStudents = () => {
  return apiClient.get("/students");
};

export const createStudent = (data) => {
  return apiClient.post("/students", data);
};

export const deleteStudent = (id) => {
  return apiClient.delete(`/students/${id}`);
};
