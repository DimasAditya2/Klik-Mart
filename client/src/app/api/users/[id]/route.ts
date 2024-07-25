import { getUserById } from "@/db/models/user";
import { NextRequest, NextResponse } from "next/server";
type ParamsProp = { params: { id: string } };
export async function GET(request: NextRequest, { params }: ParamsProp) {
  const userById = await getUserById(params.id);

  return NextResponse.json(
    {
      data: userById,
    },
    {
      status: 200,
    }
  );
}
