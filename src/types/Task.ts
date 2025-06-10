
export interface Task {
  id: number;
  user_id: number;
  title: string;
  description: string;
  status: string;
  created_at: string;
  completed: boolean;
}

export interface CreateTaskData {
  title: string;
  description: string;
}
