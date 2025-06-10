
import { User, CreateUserData } from '../types/User';
import { Task, CreateTaskData } from '../types/Task';

const USERS_KEY = 'task_manager_users';
const TASKS_KEY = 'task_manager_tasks';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  async getUsers(): Promise<User[]> {
    await delay(300);
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  },

  async createUser(userData: CreateUserData): Promise<User> {
    await delay(500);
    const users = await this.getUsers();
    const newUser: User = {
      id: crypto.randomUUID(),
      name: userData.name,
      email: userData.email,
      created_at: new Date().toISOString(),
    };
    
    const updatedUsers = [...users, newUser];
    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
    return newUser;
  },

  async getUserTasks(userId: string): Promise<Task[]> {
    await delay(200);
    const tasks = localStorage.getItem(TASKS_KEY);
    const allTasks: Task[] = tasks ? JSON.parse(tasks) : [];
    return allTasks.filter(task => task.user_id === userId);
  },

  async createTask(userId: string, taskData: CreateTaskData): Promise<Task> {
    await delay(400);
    const tasks = await this.getAllTasks();
    const newTask: Task = {
      id: crypto.randomUUID(),
      user_id: userId,
      title: taskData.title,
      description: taskData.description,
      completed: false,
      created_at: new Date().toISOString(),
    };
    
    const updatedTasks = [...tasks, newTask];
    localStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
    return newTask;
  },

  async getAllTasks(): Promise<Task[]> {
    const tasks = localStorage.getItem(TASKS_KEY);
    return tasks ? JSON.parse(tasks) : [];
  },

  async toggleTaskCompletion(taskId: string): Promise<Task> {
    await delay(200);
    const tasks = await this.getAllTasks();
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    localStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
    return updatedTasks.find(task => task.id === taskId)!;
  }
};
