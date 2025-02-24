import axios from 'axios';
import { getCurrentUser } from './authService';

const API_URL = process.env.REACT_APP_API_URL + '/tasks';

export async function getTasks() {
  const user = getCurrentUser();
  return axios.get(API_URL, {
    headers: { Authorization: `Bearer ${user.token}` },
    params: { userId: user.id },
  });
}

export async function createTask(title: string, description: string) {
  const user = getCurrentUser();
  return axios.post(API_URL, { userId: user.id, title, description }, {
    headers: { Authorization: `Bearer ${user.token}` },
  });
}

export async function updateTask(id: string, title: string, description: string, isComplete: boolean) {
  const user = getCurrentUser();
  return axios.put(`${API_URL}/${id}`, { title, description, isComplete }, {
    headers: { Authorization: `Bearer ${user.token}` },
  });
}

export async function deleteTask(id: string) {
  const user = getCurrentUser();
  return axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${user.token}` },
  });
}