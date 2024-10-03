import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(_request: NextRequest) {
  try {
    const users = await User.find(
      {},
      { firstName: 1, lastName: 1, email: 1, phoneNumber: 1, isAdmin: 1 }
    );

    const formattedUsers = users.map((user) => ({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      number: user.phoneNumber || "N/A",
      role: user.isAdmin ? "admin" : "user",
    }));

    return NextResponse.json(
      { users: formattedUsers, success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message, success: false },
      { status: 500 }
    );
  }
}
