import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/auth';

export async function register(username: string, password: string) {
  return axios.post(`${API_URL}/register`, { username, password });
}

export async function login(username: string, password: string) {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  if (response.data.token && response.data.id) {
    localStorage.setItem('user', JSON.stringify({ token: response.data.token, id: response.data.id }));
  }
  return response.data;
}

export function logout() {
  localStorage.removeItem('user');
  window.location.reload();
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user') || '{}');
}