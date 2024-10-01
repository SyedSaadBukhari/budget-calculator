import { connect } from "@/dbConfig/dbConfig";
import Expense from "@/models/expenseModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    const { title, amount, date } = await request.json();

    const newExpense = new Expense({
      title,
      amount,
      date: date || Date.now(),
      user: userId,
    });

    await newExpense.save();

    return NextResponse.json({
      message: "Expense added successfully",
      expense: newExpense,
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    const expenses = await Expense.find({ user: userId }).sort({ date: -1 });

    return NextResponse.json({
      message: "Expenses fetched successfully",
      expenses,
    });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return NextResponse.json({ error: "Token expired" }, { status: 401 });
    }
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
