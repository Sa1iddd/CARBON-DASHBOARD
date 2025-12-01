import { NextRequest, NextResponse } from "next/server";
import DormController from "@/lib/features/dorm/presentation/dorm.controller";

const controller = new DormController();

export async function GET(req: NextRequest, { params }: any) {
  try {
    const result = await controller.getById(params.id);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 404 });
  }
}

export async function PUT(req: NextRequest, { params }: any) {
  try {
    const body = await req.json();
    const result = await controller.update(params.id, body);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: any) {
  try {
    const result = await controller.delete(params.id);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
