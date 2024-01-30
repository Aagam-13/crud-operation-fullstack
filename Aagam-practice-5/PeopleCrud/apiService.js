import axios from 'axios';

export const API_BASE_URL = 'https://localhost:7020/api';

export const getPeople = () => {
  return axios.get(`${API_BASE_URL}/People`);
};

export const getPersonById = (id) => {
  return axios.get(`${API_BASE_URL}/People/${id}`);
};

export const addPerson = (data) => {
  return axios.post(`${API_BASE_URL}/People`, data);
};

export const updatePerson = (id, data) => {
  return axios.put(`${API_BASE_URL}/People/${id}`, data);
};

export const deletePerson = (id) => {
  return axios.delete(`${API_BASE_URL}/People/${id}`);
};

export const register = (Username, Email, Password) => {
  return axios.post(`${API_BASE_URL}/Authenticate/register`, { Username, Email, Password });
};

export const login = (Username, Password) => {
  return axios.post(`${API_BASE_URL}/Authenticate/login`, { Username, Password });
};
