import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function PUT(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    const reqBody = await request.json();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        firstName: reqBody.firstName,
        lastName: reqBody.lastName,
        fatherName: reqBody.fatherName,
        email: reqBody.email,
        budgetLimit: reqBody.budgetLimit,
        jobTitle: reqBody.jobTitle,
        streetAddress: reqBody.streetAddress,
        city: reqBody.city,
        state: reqBody.state,
        zipCode: reqBody.zipCode,
        completeAddress: reqBody.completeAddress,
        phoneNumber: reqBody.phoneNumber,
        dateOfBirth: reqBody.dateOfBirth,
        education: reqBody.education,
        gender: reqBody.gender,
        aboutUser: reqBody.aboutUser,
        website: reqBody.website,
      },
      { new: true, runValidators: true }
    );
    console.log("Updated User:", updatedUser);
    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
