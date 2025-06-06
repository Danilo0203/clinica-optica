"use client";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { UserAvatarProfile } from "@/components/user-avatar-profile";
import { navItems } from "@/constants/data";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  IconBell,
  IconChevronDown,
  IconChevronRight,
  IconChevronsDown,
  IconCreditCard,
  IconLogout,
  IconPhotoUp,
  IconUserCircle,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import { OrgSwitcher } from "../org-switcher";
import { icons } from "lucide-react";
import { NavItem } from "@/types";
export const company = {
  name: "Acme Inc",
  logo: IconPhotoUp,
  plan: "Enterprise",
};

const tenants = [
  { id: "1", name: "Acme Inc" },
  { id: "2", name: "Beta Corp" },
  { id: "3", name: "Gamma Ltd" },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const { isOpen } = useMediaQuery();
  const router = useRouter();

  const isPathActive = (item: NavItem) => {
    if (item.url === pathname) return true;
    if (item.items) {
      return item.items.some((subItem) => {
        if (subItem.url === pathname) return true;
        if (subItem.items) {
          return subItem.items.some((nestedItem) => nestedItem.url === pathname);
        }
        return false;
      });
    }
    return false;
  };

  const handleSwitchTenant = (_tenantId: string) => {
    // Tenant switching functionality would be implemented here
  };

  const activeTenant = tenants[0];

  React.useEffect(() => {
    // Side effects based on sidebar state changes
  }, [isOpen]);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <OrgSwitcher tenants={tenants} defaultTenant={activeTenant} onTenantSwitch={handleSwitchTenant} />
      </SidebarHeader>
      <SidebarContent className="overflow-x-hidden">
        <SidebarGroup>
          <SidebarGroupLabel>Sistema Vortex</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => {
              const Icon = item.icon ? icons[item.icon] : icons.LayoutDashboard;
              return item?.items && item?.items?.length > 0 ? (
                <Collapsible key={item.title} asChild defaultOpen={isPathActive(item)} className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title} isActive={pathname === item.url}>
                        {item.icon && <Icon />}
                        <span>{item.title}</span>
                        <IconChevronRight className="ml-auto transition-transform duration-300 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => {
                          const Icon = subItem.icon ? icons[subItem.icon] : icons.LayoutDashboard;
                          return subItem.items && subItem.items.length > 0 ? (
                            <SidebarMenuSubItem key={subItem.title}>
                              <Collapsible
                                key={subItem.title}
                                asChild
                                defaultOpen={isPathActive(subItem)}
                                className="group/collapsible"
                              >
                                <div>
                                  <CollapsibleTrigger asChild>
                                    <SidebarMenuSubButton isActive={pathname === subItem.url}>
                                      <Icon />
                                      <span>{subItem.title}</span>
                                      <IconChevronDown className="ml-auto transition-transform duration-200 group-data-[state=closed]/collapsible:-rotate-90" />
                                    </SidebarMenuSubButton>
                                  </CollapsibleTrigger>
                                  <CollapsibleContent>
                                    <SidebarMenuSub>
                                      {subItem.items.map((nestedItem) => {
                                        const NestedIcon = nestedItem.icon
                                          ? icons[nestedItem.icon]
                                          : icons.LayoutDashboard;

                                        return (
                                          <SidebarMenuItem key={nestedItem.title}>
                                            <SidebarMenuButton
                                              asChild
                                              tooltip={nestedItem.title}
                                              isActive={pathname === nestedItem.url}
                                            >
                                              <Link href={nestedItem.url}>
                                                <NestedIcon />
                                                <span>{nestedItem.title}</span>
                                              </Link>
                                            </SidebarMenuButton>
                                          </SidebarMenuItem>
                                        );
                                      })}
                                    </SidebarMenuSub>
                                  </CollapsibleContent>
                                </div>
                              </Collapsible>
                            </SidebarMenuSubItem>
                          ) : (
                            <SidebarMenuItem key={subItem.title}>
                              <SidebarMenuButton asChild tooltip={subItem.title} isActive={pathname === subItem.url}>
                                <Link href={subItem.url}>
                                  <Icon />
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title} isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <Icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  {/* {user && <UserAvatarProfile className="h-8 w-8 rounded-lg" showInfo user={user} />} */}
                  <IconChevronsDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="px-1 py-1.5">
                    {/* {user && <UserAvatarProfile className="h-8 w-8 rounded-lg" showInfo user={user} />} */}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>
                    <IconUserCircle className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <IconCreditCard className="mr-2 h-4 w-4" />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <IconBell className="mr-2 h-4 w-4" />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <IconLogout className="mr-2 h-4 w-4" />
                  {/* <SignOutButton redirectUrl="/auth/sign-in" /> */}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
