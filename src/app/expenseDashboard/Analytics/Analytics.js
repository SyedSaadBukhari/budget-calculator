import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TableContainer,
  Box,
  MenuItem,
  Select,
  Paper,
  Typography,
  Divider,
  CircularProgress,
} from "@mui/material";

const AnalyticsGraph = () => {
  const [expenses, setExpenses] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState(12);

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    if (expenses.length > 0) {
      processExpenses();
    }
  }, [expenses, timeRange]);

  const fetchExpenses = async () => {
    try {
      const response = await fetch("/api/users/expenses", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch expenses");
      }

      const data = await response.json();
      setExpenses(data.expenses);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      setIsLoading(false);
    }
  };

  const processExpenses = () => {
    const now = new Date();
    const monthsAgo = new Date(now.setMonth(now.getMonth() - timeRange));

    const filteredExpenses = expenses.filter(
      (expense) => new Date(expense.date) >= monthsAgo
    );

    const monthlyTotals = filteredExpenses.reduce((acc, expense) => {
      const date = new Date(expense.date);
      const monthYear = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      if (!acc[monthYear]) {
        acc[monthYear] = 0;
      }
      acc[monthYear] += expense.amount;
      return acc;
    }, {});

    const sortedData = Object.entries(monthlyTotals)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, total]) => ({
        name: new Date(date).toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
        value: total,
      }));

    setChartData(sortedData);
  };

  const handleTimeRangeChange = (event) => {
    setTimeRange(Number(event.target.value));
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <main style={{ padding: "0 20px" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", padding: "20px 0" }}>
        Analytics
      </Typography>
      <Divider />

      <Box p="20px 0">
        <TableContainer component={Paper}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            padding="0.5rem"
            backgroundColor="#f7f7f7"
          >
            <Typography variant="h5">Expenses</Typography>

            <Box display="flex" gap={1}>
              <Select
                size="small"
                value={timeRange}
                onChange={handleTimeRangeChange}
              >
                <MenuItem value={6}>Last 6 Months</MenuItem>
                <MenuItem value={12}>Last 12 Months</MenuItem>
              </Select>
            </Box>
          </Box>
          <div style={{ width: "100%", height: 500 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  name="Total Expenses"
                  stroke="#7539ff"
                  activeDot={{ r: 8 }}
                  dot={{ r: 4, fill: "#7539ff" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TableContainer>
      </Box>
    </main>
  );
};

export default AnalyticsGraph;
