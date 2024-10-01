import { connect } from "@/dbConfig/dbConfig";
import Expense from "@/models/expenseModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = getDataFromToken(request);
    const { title, amount, date } = await request.json();
    const expenseId = params.id;

    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: expenseId, user: userId },
      { title, amount, date },
      { new: true }
    );

    if (!updatedExpense) {
      return NextResponse.json({ error: "Expense not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Expense updated successfully",
      expense: updatedExpense,
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = getDataFromToken(request);
    const expenseId = params.id;

    const deletedExpense = await Expense.findOneAndDelete({
      _id: expenseId,
      user: userId,
    });

    if (!deletedExpense) {
      return NextResponse.json({ error: "Expense not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
