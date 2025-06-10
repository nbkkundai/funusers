
import { Task } from '../src/Task';

export interface User {
  id: number;
  name: string;
  email: string;
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
