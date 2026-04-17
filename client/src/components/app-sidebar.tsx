import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Code } from "lucide-react";
import { NavLink } from "react-router-dom";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <span className="text-lg font-bold pl-3">Lead Management</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenuButton asChild>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
                    : ""
                }
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </NavLink>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <NavLink
                to="/technology"
                className={({ isActive }) =>
                  isActive
                    ? "data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
                    : ""
                }
              >
                <Code className="mr-2 h-4 w-4" />
                <span>Technology</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
