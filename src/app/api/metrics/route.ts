import { NextResponse } from "next/server";
import { dataOrchestrator } from "@/services/core/DataOrchestrator";

export async function GET() {
  const metrics = dataOrchestrator.getMetricsSnapshot();
  const circuit = dataOrchestrator.getCircuitState();
  return NextResponse.json({ ...metrics, circuit });
}

export async function POST() {
  dataOrchestrator.clearAll();
  return NextResponse.json({ status: "cleared", ...dataOrchestrator.getMetricsSnapshot() });
}
