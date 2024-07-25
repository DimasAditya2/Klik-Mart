import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { findByEmail } from "@/db/models/user";
import { comparePass } from "@/db/helpers/bcrypt";
import { signToken } from "@/db/helpers/util";

export const loginSchema = z.object({
  email: z
    .string({ message: "email required" })
    .email({ message: "Invalid email format" }),
  password: z.string({ message: "password required" }),
});

export const POST = async (req: NextRequest) => {
  // ? type narrowing typescript
  // login flow ✓
  // ambil data dari req json ✓
  // validasi email dan password ✓
  // klo gagal respon 400 ✓
  // cek user di database kalo ga ada respone 401 -> invalid username/password ✓
  // cek password if false throw respone 401  -> invalid username/password ✓
  // create token ✓
  // respon dengan access_token ✓
  try {
    const reqBody = await req.json();

    const data = await loginSchema.parseAsync(reqBody);
    const user = await findByEmail(data.email);

    if (!user) {
      throw NextResponse.json(
        {
          message: "Invalid email/password",
        },
        { status: 401 }
      );
    }

    const isPasswordCorrect = comparePass(data.password, user.password);

    if (!isPasswordCorrect) {
      throw NextResponse.json(
        {
          message: "Invalid email/password",
        },
        { status: 401 }
      );
    }

    const access_token = signToken({_id: user._id.toString(), email: user.email})

    return NextResponse.json({
      access_token,
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
};
