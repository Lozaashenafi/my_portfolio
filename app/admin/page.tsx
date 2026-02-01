"use client";
import BlogManagement from "../../components/admin/BlogManagement";
import CategoryManagement from "../../components/admin/CategoryManagement";
import CvManagement from "../../components/admin/CvManagement";
import DashboardOverview from "../../components/admin/DashboardOverview";
import ExperienceManagement from "../../components/admin/ExperienceManagement";
import MessageInbox from "../../components/admin/MessageInbox";
import ProjectManagement from "../../components/admin/ProjectManagement";
import SkillManagement from "../../components/admin/SkillManagement";
import { useAdminStore } from "../../store/useAdminStore";

export default function AdminPage() {
  const { currentTab } = useAdminStore();

  switch (currentTab) {
    case "overview":
      return <DashboardOverview />;
    case "projects":
      return <ProjectManagement />;
    case "blog":
      return <BlogManagement />;
    case "experience":
      return <ExperienceManagement />;
    case "skills":
      return <SkillManagement />;
    case "messages":
      return <MessageInbox />;
    case "cv":
      return <CvManagement />;

    default:
      return <DashboardOverview />;
  }
}
