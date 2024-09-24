import { NextRequest, NextResponse } from "next/server";

import { crmServes } from "@/services/crm";

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams.toString();
    const leads = await crmServes.getLeads(params);

    return NextResponse.json(leads, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "server error" }, { status: 200 });
  }
}
