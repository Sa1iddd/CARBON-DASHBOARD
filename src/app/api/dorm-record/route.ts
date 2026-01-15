// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/common/database/PrismaClient";

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();

//     const record = await prisma.dormRecord.create({
//       data: {
//         period: new Date(body.period),
//         dormName: body.dormName,
//         totalKwh: Number(body.totalKwh),
//         billAmount: Number(body.billAmount),
//         // createdBy: "dev-user", // sementara tanpa auth
//       },
//     });

//     return NextResponse.json(record);
//   } catch (error: any) {
//     return NextResponse.json(
//       { error: error.message },
//       { status: 400 }
//     );
//   }
// }

// export async function GET() {
//   const records = await prisma.dormRecord.findMany({
//     orderBy: { createdAt: "desc" },
//   });
//   return NextResponse.json(records);
// }

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/common/database/PrismaClient";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 🔒 VALIDASI KERAS (WAJIB DI SERVERLESS)
    if (
      !body.period ||
      !body.dormName ||
      body.totalKwh === undefined ||
      body.billAmount === undefined
    ) {
      return NextResponse.json(
        { error: "Payload tidak lengkap atau invalid" },
        { status: 400 }
      );
    }

    const totalKwh = parseFloat(body.totalKwh);
    const billAmount = parseFloat(body.billAmount);

    if (isNaN(totalKwh) || isNaN(billAmount)) {
      return NextResponse.json(
        { error: "totalKwh / billAmount bukan angka valid" },
        { status: 400 }
      );
    }

    const record = await prisma.dormRecord.create({
      data: {
        period: new Date(body.period),
        dormName: body.dormName,
        totalKwh,
        billAmount,
        // ❌ JANGAN createdBy dulu
      },
    });

    return NextResponse.json(record);
  } catch (error: any) {
    console.error("PRISMA ERROR:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

