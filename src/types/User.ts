
import { Task } from './Task';

export interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export interface UserWithTasks extends User {
  tasks: Task[];
}

export interface UserWithTaskCount extends User {
  taskCount: number;
}

export interface CreateUserData {
  name: string;
  email: string;
}
