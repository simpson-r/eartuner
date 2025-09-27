import { Metadata } from "next";

import { getCurrentSessionRedirect } from "@/lib/sessions";
import { DashboardPage } from "@/components/pages/DashboardPage";

export const metadata: Metadata = { title: "Dashboard" };

const Dashboard = async () => {
  const session = await getCurrentSessionRedirect();

  return <DashboardPage user={session.user} />;
};

export default Dashboard;
