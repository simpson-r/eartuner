import { Metadata } from "next";

import db from "@/core/db";
import { getCurrentSessionRedirect } from "@/lib/sessions";
import { DashboardPage } from "@/components/pages/DashboardPage";

export const metadata: Metadata = { title: "Dashboard" };
const EXERCISES_PER_PAGE = 10;

const Dashboard = async () => {
  const session = await getCurrentSessionRedirect();

  const exercises = await db.exercise.findMany({
    where: { userId: session.userId },
    take: EXERCISES_PER_PAGE,
  });

  // const attempts = await db.attempt.findMany({
  //   where: { userId: session.userId },
  //   orderBy: { createdAt: "desc" },
  // });

  return (
    <DashboardPage user={session.user} exercises={exercises} attempts={null} />
  );
};

export default Dashboard;
