import ProtectedRoute from "@/components/auth/ProtectedRoute";

import Sidebar from "@/components/ui/Sidebar";

import Topbar from "@/components/ui/Topbar";

import DragDropBoard from "@/components/kanban/DragDropBoard";

import TaskChart from "@/components/charts/TaskChart";

import RecentTasks from "@/components/dashboard/RecentTasks";

import CreateTaskButton from "@/components/dashboard/CreateTaskButton";

import ProductivityCard from "@/components/dashboard/ProductivityCard";

import OverdueTasks from "@/components/dashboard/OverdueTasks";

import ActivityTimeline from "@/components/dashboard/ActivityTimeline";

import TeamMembers from "@/components/dashboard/TeamMembers";

import ProjectProgress from "@/components/dashboard/ProjectProgress";

import UpcomingDeadlines from "@/components/dashboard/UpcomingDeadlines";

import QuickActions from "@/components/dashboard/QuickActions";

import StorageCard from "@/components/dashboard/StorageCard";

import WorkspaceCard from "@/components/dashboard/WorkspaceCard";

import CalendarWidget from "@/components/dashboard/CalendarWidget";

import NotificationPanel from "@/components/dashboard/NotificationPanel";

import AIInsights from "@/components/dashboard/AIInsights";

import TeamPerformance from "@/components/dashboard/TeamPerformance";

import RecentProjects from "@/components/dashboard/RecentProjects";

import WorkspaceBanner from "@/components/dashboard/WorkspaceBanner";

import ProjectActivity from "@/components/dashboard/ProjectActivity";

import TaskOverview from "@/components/dashboard/TaskOverview";

import StatsGrid from "@/components/ui/StatsGrid";

import PageHeader from "@/components/ui/PageHeader";

import SystemStatus from "@/components/dashboard/SystemStatus";

import RecentFiles from "@/components/dashboard/RecentFiles";

import WorkspaceAnalytics from "@/components/dashboard/WorkspaceAnalytics";

import WorkspaceMembers from "@/components/dashboard/WorkspaceMembers";

import TaskPriorityChart from "@/components/dashboard/TaskPriorityChart";

import WorkspaceGoals from "@/components/dashboard/WorkspaceGoals";

import WorkspaceUpdates from "@/components/dashboard/WorkspaceUpdates";

import TaskCompletionHeatmap from "@/components/dashboard/TaskCompletionHeatmap";

import WorkspaceStorage from "@/components/dashboard/WorkspaceStorage";

import ProductivityLeaderboard from "@/components/dashboard/ProductivityLeaderboard";

import RecentComments from "@/components/dashboard/RecentComments";

import WorkspaceCalendar from "@/components/dashboard/WorkspaceCalendar";

import WorkspaceAnnouncements from "@/components/dashboard/WorkspaceAnnouncements";

import WorkspaceIntegrations from "@/components/dashboard/WorkspaceIntegrations";

import TaskMetrics from "@/components/dashboard/TaskMetrics";

import WorkspaceDevices from "@/components/dashboard/WorkspaceDevices";

import WorkspaceBackups from "@/components/dashboard/WorkspaceBackups";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />

        <div className="flex-1 bg-gray-100 p-8">
          <Topbar />

          <div className="flex items-center justify-between">
            <PageHeader
              title="Dashboard"
              description="Manage projects, tasks and team productivity."
            />

            <CreateTaskButton />
          </div>

          <WorkspaceBanner />

          <div className="mt-8">
            <StatsGrid />
          </div>

          <div className="mt-8">
            <WorkspaceCard />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <TaskChart />
            <ProductivityCard />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <RecentTasks />
            <OverdueTasks />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ActivityTimeline />
            <TeamMembers />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <UpcomingDeadlines />
            <QuickActions />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <CalendarWidget />
            <NotificationPanel />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <AIInsights />
            <TeamPerformance />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ProjectActivity />
            <TaskOverview />
          </div>

          <div className="mt-8">
            <RecentProjects />
          </div>

          <div className="mt-8">
            <StorageCard />
          </div>

          <div className="mt-8">
            <ProjectProgress />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <TaskCompletionHeatmap />
            <WorkspaceStorage />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ProductivityLeaderboard />
            <RecentComments />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <WorkspaceAnnouncements />
            <WorkspaceIntegrations />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <TaskMetrics />
            <WorkspaceDevices />
          </div>

          <div className="mt-8">
            <WorkspaceBackups />
          </div>

          <div className="mt-8">
            <WorkspaceCalendar />
          </div>


          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <WorkspaceMembers />
            <TaskPriorityChart />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <WorkspaceGoals />
            <WorkspaceUpdates />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <RecentFiles />
            <WorkspaceAnalytics />
          </div>

          <div className="mt-8">
            <SystemStatus />
          </div>

          <div className="mt-8">
            <DragDropBoard />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}