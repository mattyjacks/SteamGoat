import type { Metadata } from "next";
import { CapabilityStatementPage } from "./capability-page-client";

export const metadata: Metadata = {
  title: "Capability Statement",
  description: "SteamGOAT one-page capability statement for government contracting officers. OMWBE/PWSBE/WOSB certified.",
};

export default function CapabilityStatement() {
  return <CapabilityStatementPage />;
}
