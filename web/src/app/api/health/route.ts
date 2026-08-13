import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = await getDatabase();
    await db.command({ ping: 1 });
    return NextResponse.json({ status: "ok", database: "connected" });
  } catch (error) {
    console.error("Database health check failed", error);
    return NextResponse.json(
      { status: "error", database: "unavailable" },
      { status: 503 }
    );
  }
}
