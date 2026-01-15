import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/common/database/PrismaClient";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const record = await prisma.dormRecord.create({
      data: {
        period: new Date(body.period),
        dormName: body.dormName,
        totalKwh: Number(body.totalKwh),
        billAmount: Number(body.billAmount),
        // createdBy: "dev-user", // sementara tanpa auth
      },
    });

    return NextResponse.json(record);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

export async function GET() {
  const records = await prisma.dormRecord.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(records);
}
