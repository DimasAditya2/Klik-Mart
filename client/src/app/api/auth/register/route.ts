import { hasPass } from "@/db/helpers/bcrypt";
import { signToken } from "@/db/helpers/util";
import { createUser, findByEmail } from "@/db/models/user";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const registerSchema = z.object({
  name: z.string({ message: "name required" }),
  username: z.string({ message: "username required" }),
  email: z.string({ message: "email required" }),
  password: z.string({ message: "password required" }),
});

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();

    const data = await registerSchema.parseAsync(reqBody);
    // cek apakah user sudah ada
    const existingUser = await findByEmail(data.email);

    if (existingUser) {
      throw NextResponse.json(
        {
          message: "User already exists!",
        },
        {
          status: 409,
        }
      );
    }

    await createUser({
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
    });

    return NextResponse.json({
      message: "succes create user",
    });
  } catch (error) {
    console.log("erorr di register:", error);
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
};
