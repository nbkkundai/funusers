
import { Task } from '../types/Task';
import { CheckCircle, Circle, Clock } from 'lucide-react';
import { apiClient } from '../integrations/client.ts';

interface TaskCardProps {
  task: Task;
  onTaskUpdated?: () => void;
}

export const TaskCard = ({ task, onTaskUpdated }: TaskCardProps) => {
  const handleToggleCompletion = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await apiClient.toggleTaskCompletion(task.id);
      if (onTaskUpdated) {
        onTaskUpdated();
      }
    } catch (error) {
      console.error('Failed to toggle task completion:', error);
    }
  };

  return (
    <div className="bg-card border rounded-xl p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-start gap-3 mb-4">
        <button
          onClick={handleToggleCompletion}
          className="mt-0.5 flex-shrink-0 hover:scale-110 transition-transform"
        >
          {task.completed ? (
            <CheckCircle className="text-green-500" size={20} />
          ) : (
            <Circle className="text-muted-foreground hover:text-primary" size={20} />
          )}
        </button>
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-lg mb-2 ${task.completed ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className={`text-sm mb-3 ${task.completed ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
              {task.description}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Clock size={14} />
        <span>Created {new Date(task.created_at).toLocaleDateString()}</span>
      </div>
      
      {task.completed && (
        <div className="mt-3 px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full inline-block">
          Completed
        </div>
      )}
    </div>
  );
};
