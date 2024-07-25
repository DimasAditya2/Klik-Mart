import { createUser, getAllUsers } from "@/db/models/user";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest) {
  const users = await getAllUsers();

  return NextResponse.json(
    {
      users,
    },
    {
      status: 200,
    }
  );
}

export async function POST(request: NextRequest) {
  // ? logic
  // 1. validasi user
  // - apakah ada email?
  // - apakah ada password?
  // 2. kita create data
  // 3. repspone {id: string, email: string}
  const data = await request.json();
  try {
    const parseData = z
      .object({
        name: z.string({ message: "name required" }),
        username: z.string({ message: "username required" }),
        email: z
          .string({ message: "email required" })
          .email({ message: "Invalid email format" }),
        password: z.string({ message: "password required" }).min(5).max(5),
      })
      .safeParse(data);

    if (!parseData.success) {
      throw parseData.error;
    }

    const newUser = await createUser(data);


    return NextResponse.json({message: 'User created', data: newUser}, {
      status: 201,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        message: error.errors[0].message,
      });
    } else {
      return NextResponse.json(
        {
          message: "Internal server error",
        },
        {
          status: 500,
        }
      );
    }
  }
}
