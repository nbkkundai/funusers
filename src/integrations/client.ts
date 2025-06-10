import { UserWithTaskCount, UserWithTasks } from 'server/src/User.ts';
import { Task } from 'server/src/Task.ts';

const API_URL = 'http://localhost:3001/api';

export const apiClient = {
  async getUsersWithTaskCounts(): Promise<UserWithTaskCount[]> {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  async createUser(userData: { name: string; email: string }) {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    if (!response.ok) throw new Error('Failed to create user');
    return response.json();
  },

  async getUserTasks(userId: number): Promise<Task[]> {
    const response = await fetch(`${API_URL}/users/${userId}/tasks`);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return response.json();
  },

  async createTask(userId: number, taskData: { title: string; description: string }): Promise<Task> {
    const response = await fetch(`${API_URL}/users/${userId}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData)
    });
    if (!response.ok) throw new Error('Failed to create task');
    return response.json();
  },

  async toggleTaskCompletion(taskId: number): Promise<void> {
    const response = await fetch(`${API_URL}/tasks/${taskId}/toggle`, {
      method: 'PUT'
    });
    if (!response.ok) throw new Error('Failed to toggle task');
  },

  async updateTaskStatus(taskId: number, status: string): Promise<void> {
    const response = await fetch(`${API_URL}/tasks/${taskId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (!response.ok) throw new Error('Failed to update task status');
  }
};

export type ApiClient = typeof apiClient;