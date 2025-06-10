
import { useState, useEffect } from 'react';
import { UserWithTaskCount, UserWithTasks } from '../types/User';
import { UserCard } from '../components/UserCard';
import { TaskCard } from '../components/TaskCard';
import { CreateUserForm } from '../components/CreateUserForm';
import { CreateTaskForm } from '../components/CreateTaskForm';
import { Users, Plus, ArrowLeft } from 'lucide-react';
import { apiClient } from '../api/apiClient';

const Index = () => {
  const [users, setUsers] = useState<UserWithTaskCount[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserWithTasks | null>(null);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const usersData = await apiClient.getUsersWithTaskCounts();
      setUsers(usersData);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (userData: { name: string; email: string }) => {
    try {
      await apiClient.createUser(userData);
      await loadUsers();
      setShowCreateUser(false);
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  const handleSelectUser = async (user: UserWithTaskCount) => {
    setLoading(true);
    try {
      const tasks = await apiClient.getUserTasks(user.id);
      setSelectedUser({ ...user, tasks });
    } catch (error) {
      console.error('Failed to load user tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData: { title: string; description: string }) => {
    if (!selectedUser) return;
    
    try {
      const newTask = await apiClient.createTask(selectedUser.id, taskData);
      setSelectedUser(prev => prev ? {
        ...prev,
        tasks: [newTask, ...prev.tasks]
      } : null);
      setShowCreateTask(false);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleTaskUpdated = async () => {
    if (!selectedUser) return;
    
    try {
      const tasks = await apiClient.getUserTasks(selectedUser.id);
      setSelectedUser(prev => prev ? { ...prev, tasks } : null);
    } catch (error) {
      console.error('Failed to refresh tasks:', error);
    }
  };

  const handleBackToUsers = () => {
    setSelectedUser(null);
    setShowCreateTask(false);
    loadUsers(); // Refresh users to update task counts
  };

  if (selectedUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBackToUsers}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft size={20} />
                Back to Users
              </button>
              <div>
                <h1 className="text-3xl font-bold text-foreground">{selectedUser.name}'s Tasks</h1>
                <p className="text-muted-foreground">{selectedUser.email}</p>
              </div>
            </div>
            <button
              onClick={() => setShowCreateTask(true)}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              Add Task
            </button>
          </div>

          {showCreateTask && (
            <div className="mb-6">
              <CreateTaskForm
                onSubmit={handleCreateTask}
                onCancel={() => setShowCreateTask(false)}
              />
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {selectedUser.tasks.map((task) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onTaskUpdated={handleTaskUpdated}
              />
            ))}
            {selectedUser.tasks.length === 0 && !showCreateTask && (
              <div className="col-span-full text-center py-12">
                <div className="text-muted-foreground text-lg">No tasks yet</div>
                <button
                  onClick={() => setShowCreateTask(true)}
                  className="mt-4 text-primary hover:text-primary/80 transition-colors"
                >
                  Create the first task
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-3 rounded-xl">
              <Users className="text-primary" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Task Manager</h1>
              <p className="text-muted-foreground">Manage users and their tasks</p>
            </div>
          </div>
          <button
            onClick={() => setShowCreateUser(true)}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 font-medium"
          >
            <Plus size={20} />
            Add User
          </button>
        </div>

        {showCreateUser && (
          <div className="mb-6">
            <CreateUserForm
              onSubmit={handleCreateUser}
              onCancel={() => setShowCreateUser(false)}
            />
          </div>
        )}

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card rounded-xl p-6 border animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onClick={() => handleSelectUser(user)}
              />
            ))}
            {users.length === 0 && !showCreateUser && (
              <div className="col-span-full text-center py-16">
                <div className="bg-muted/30 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                  <Users className="text-muted-foreground" size={48} />
                </div>
                <div className="text-muted-foreground text-xl mb-2">No users yet</div>
                <p className="text-muted-foreground mb-6">Get started by creating your first user</p>
                <button
                  onClick={() => setShowCreateUser(true)}
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Create First User
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
