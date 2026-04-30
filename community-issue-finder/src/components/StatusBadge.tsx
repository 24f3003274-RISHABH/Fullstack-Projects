import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "new" | "progress" | "resolved";
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const statusConfig = {
    new: { 
      label: "New", 
      className: "status-new" 
    },
    progress: { 
      label: "In Progress", 
      className: "status-progress" 
    },
    resolved: { 
      label: "Resolved", 
      className: "status-resolved" 
    },
  };
  
  const config = statusConfig[status];
  
  return (
    <Badge className={cn("status-badge", config.className, className)}>
      {config.label}
    </Badge>
  );
};

export default StatusBadge;