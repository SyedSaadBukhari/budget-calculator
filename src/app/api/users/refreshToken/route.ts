import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!, {
      ignoreExpiration: true,
    });

    const user = await User.findById(decodedToken.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.TOKEN_SECRET!,
      { expiresIn: "1d" }
    );

    const response = NextResponse.json({
      message: "Token refreshed successfully",
    });
    response.cookies.set("token", newToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 401 }
    );
  }
}
