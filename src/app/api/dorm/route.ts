// import { NextRequest, NextResponse } from "next/server";
// import DormController from "@/lib/features/dorm/presentation/dorm.controller";

// const controller = new DormController();

// export async function GET() {
//   try {
//     const result = await controller.getAll();
//     return NextResponse.json(result);
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 400 });
//   }
// }

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const result = await controller.create(body);
//     return NextResponse.json(result, { status: 201 });
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 400 });
//   }
// }

// app/api/dorm/route.ts
import prisma from "@/lib/common/database/PrismaClient";
import { NextResponse } from "next/server";

export async function GET() {
  const dorms = await prisma.dorm.findMany({
    orderBy: { name: "asc" },
  });
  return NextResponse.json(dorms);
}

export async function POST(req: Request) {
  const body = await req.json();

  const dorm = await prisma.dorm.create({
    data: body,
  });

  return NextResponse.json(dorm);
}
