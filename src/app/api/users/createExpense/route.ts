import { connect } from "@/dbConfig/dbConfig";
import Expense from "@/models/expenseModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    const reqBody = await request.json();
    const { description, amount, date } = reqBody;

    const newExpense = new Expense({
      user: userId,
      description,
      amount,
      date,
    });

    const savedExpense = await newExpense.save();
    return NextResponse.json(savedExpense, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error adding expense", details: (error as Error).message },
      { status: 500 }
    );
  }
}
