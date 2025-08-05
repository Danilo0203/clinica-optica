import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Usuario } from "@/services/auth/auth.services";

interface UserAvatarProfileProps {
  className?: string;
  showInfo?: boolean;
  user?: Usuario;
}

export function UserAvatarProfile({ className, showInfo = false, user }: UserAvatarProfileProps) {
  return (
    <div className="flex items-center gap-2">
      <Avatar className={className}>
        <AvatarImage src={user?.fotografia || ""} alt={user?.nombre_completo || ""} />
        <AvatarFallback className="rounded-lg">
          {user?.username?.slice(0, 2)?.toUpperCase() || user?.nombre_completo?.slice(0, 2)?.toUpperCase() || "CN"}
        </AvatarFallback>
      </Avatar>

      {showInfo && (
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{user?.username || user?.nombre_completo || ""}</span>
          <span className="truncate text-xs">{user?.email || ""}</span>
        </div>
      )}
    </div>
  );
}
