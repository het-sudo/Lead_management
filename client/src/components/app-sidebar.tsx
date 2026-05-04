import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { LaptopMinimal, ShieldUser, UserKey } from "lucide-react";
import { NavLink } from "react-router-dom";
// import { LayoutDashboard, Code } from "lucide-react";
// import { NavLink } from "react-router-dom";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center">
          <ShieldUser />
          <span className="text-lg font-bold pl-3">Lead Management</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenuButton>
              <NavLink to="/technology">
                {" "}
                <div className="flex items-center gap-1">
                  <LaptopMinimal />
                  Technology
                </div>
              </NavLink>
            </SidebarMenuButton>{" "}
            <SidebarMenuButton>
              <NavLink to="/developer">
                <div className="flex items-center gap-1">
                  <UserKey />
                  Developer
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
