import { Metadata } from "next";
import { ReportsView } from "@/components/reports/reports-view";

export const metadata: Metadata = {
  title: "Incident Reports Management | Ratamaekata Portal",
  description: "View and review citizen-submitted suspect incident reports with attached cloud evidence.",
};

export default function ReportsPage() {
  return <ReportsView />;
}
