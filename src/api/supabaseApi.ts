
import { supabase } from '@/integrations/supabase/client';
import { User, CreateUserData, UserWithTasks } from '../types/User';
import { Task, CreateTaskData } from '../types/Task';

export const supabaseApi = {
  async getUsers(): Promise<User[]> {
    console.log('Fetching users from Supabase...');
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
    
    console.log('Users fetched successfully:', data);
    return data || [];
  },

  async getUsersWithTaskCounts(): Promise<(User & { taskCount: number })[]> {
    console.log('Fetching users with task counts from Supabase...');
    const { data, error } = await supabase
      .from('users')
      .select(`
        *,
        tasks:tasks(count)
      `)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching users with task counts:', error);
      throw error;
    }
    
    console.log('Users with task counts fetched successfully:', data);
    return (data || []).map(user => ({
      ...user,
      taskCount: user.tasks?.[0]?.count || 0
    }));
  },

  async createUser(userData: CreateUserData): Promise<User> {
    console.log('Creating user in Supabase:', userData);
    const { data, error } = await supabase
      .from('users')
      .insert([{
        name: userData.name,
        email: userData.email
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating user:', error);
      throw error;
    }
    
    console.log('User created successfully:', data);
    return data;
  },

  async getUserTasks(userId: string): Promise<Task[]> {
    console.log('Fetching tasks for user:', userId);
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching user tasks:', error);
      throw error;
    }
    
    console.log('Tasks fetched successfully:', data);
    return data || [];
  },

  async createTask(userId: string, taskData: CreateTaskData): Promise<Task> {
    console.log('Creating task in Supabase:', { userId, taskData });
    const { data, error } = await supabase
      .from('tasks')
      .insert([{
        user_id: userId,
        title: taskData.title,
        description: taskData.description
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating task:', error);
      throw error;
    }
    
    console.log('Task created successfully:', data);
    return data;
  },

  async toggleTaskCompletion(taskId: string): Promise<Task> {
    console.log('Toggling task completion:', taskId);
    
    // First get the current task state
    const { data: currentTask, error: fetchError } = await supabase
      .from('tasks')
      .select('completed')
      .eq('id', taskId)
      .single();
    
    if (fetchError) {
      console.error('Error fetching current task state:', fetchError);
      throw fetchError;
    }
    
    // Toggle the completion status
    const { data, error } = await supabase
      .from('tasks')
      .update({ completed: !currentTask.completed })
      .eq('id', taskId)
      .select()
      .single();
    
    if (error) {
      console.error('Error toggling task completion:', error);
      throw error;
    }
    
    console.log('Task completion toggled successfully:', data);
    return data;
  }
};
