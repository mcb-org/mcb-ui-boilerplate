import type { Test } from "../types";
import { api, COMMON_URL } from "./baseService";

// 🟢 Get all Test
export const getApiTest = async () => {
  try {
    const response = await api.get(COMMON_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching tests:", error);
    throw error;
  }
};

// 🟢 Get a Test by ID
export const getApiTestById = async (id: number) => {
  try {
    const response = await api.get(`${COMMON_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching test with ID ${id}:`, error);
    throw error;
  }
};

// 🟢 Create a new Test
export const postApiTest = async (data: Test) => {
  try {
    const response = await api.post(COMMON_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error creating test:", error);
    throw error;
  }
};

// 🟢 Update an existing Test
export const putApiTest = async (id: number, data: Test) => {
  try {
    const response = await api.put(`${COMMON_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating test:", error);
    throw error;
  }
};

// 🟢 Delete a Test
export const deleteApiTest = async (id: number) => {
  try {
    const response = await api.delete(`${COMMON_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting test:", error);
    throw error;
  }
};
