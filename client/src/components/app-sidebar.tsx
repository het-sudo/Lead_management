import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Plus } from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>Sidebar Header</SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupAction>
            <Plus /> <span className="sr-only">Add Project</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenuButton asChild isActive>
              <a href="#">Dashboard</a>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <a href="#">Inbox</a>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <a href="#">Campaign</a>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <a href="#">Contacts</a>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <a href="#">Segments</a>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <a href="#">Channels</a>
            </SidebarMenuButton>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
