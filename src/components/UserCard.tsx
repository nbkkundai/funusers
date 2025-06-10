
import { UserWithTaskCount } from '../types/User';
import { User as UserIcon, ChevronRight, CheckSquare } from 'lucide-react';

interface UserCardProps {
  user: UserWithTaskCount;
  onClick: () => void;
}

export const UserCard = ({ user, onClick }: UserCardProps) => {
  return (
    <div
      onClick={onClick}
      className="bg-card border rounded-xl p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group hover:border-primary/20"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
          <UserIcon className="text-primary" size={24} />
        </div>
        <ChevronRight className="text-muted-foreground group-hover:text-primary transition-colors" size={20} />
      </div>
      
      <div>
        <h3 className="font-semibold text-foreground text-lg mb-1 group-hover:text-primary transition-colors">
          {user.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-3">{user.email}</p>
        
        <div className="flex items-center gap-2 mb-3">
          <CheckSquare className="text-primary" size={16} />
          <span className="text-sm font-medium text-foreground">
            {user.taskCount} {user.taskCount === 1 ? 'task' : 'tasks'}
          </span>
        </div>
        
        <p className="text-xs text-muted-foreground">
          Created {new Date(user.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};
