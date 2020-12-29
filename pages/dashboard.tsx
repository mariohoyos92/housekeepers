import React from "react";
import DashboardSection from "../components/DashboardSection";
import { requireAuth } from "../util/auth";

function DashboardPage() {
  return <DashboardSection />;
}

export default requireAuth(DashboardPage);
