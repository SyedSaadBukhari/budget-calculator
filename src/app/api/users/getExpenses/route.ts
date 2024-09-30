import { connect } from "@/dbConfig/dbConfig";
import Expense from "@/models/expenseModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await connect();

  try {
    const userId = getDataFromToken(request);
    const expenses = await Expense.find({ user: userId });
    return NextResponse.json({ expenses }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching expenses", details: (error as Error).message },
      { status: 500 }
    );
  }
}
