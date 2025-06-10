
export interface Task {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: string;
}

export interface CreateTaskData {
  title: string;
  description: string;
}
