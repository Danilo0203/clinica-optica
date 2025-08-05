"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatarProfile } from "@/components/user-avatar-profile";
import { BtnSignOut } from "@/features/auth/components/btn-signout";
import { useQueryPerfil } from "@/modules/auth/hooks/useQueryPerfil";
import { useRouter } from "next/navigation";
export function UserNav() {
  const router = useRouter();
  const { usePerfil } = useQueryPerfil();
  const user = usePerfil.data;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <UserAvatarProfile user={user?.usuario} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" sideOffset={10} forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">
              {user?.usuario.nombre_completo || user?.usuario.username}
            </p>
            <p className="text-muted-foreground text-xs leading-none">{user?.usuario.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>Profile</DropdownMenuItem>
          {/* <DropdownMenuItem>Billing</DropdownMenuItem> */}
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>New Team</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <BtnSignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
