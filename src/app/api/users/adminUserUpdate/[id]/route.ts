import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { firstName, lastName, phoneNumber, role } = await request.json();

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        phoneNumber,
        isAdmin: role === "admin",
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { error: "User not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { user: updatedUser, success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message, success: false },
      { status: 500 }
    );
  }
}
