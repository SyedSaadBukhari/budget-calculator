import React from "react";
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
  Table,
  Paper,
  Typography,
  Divider,
} from "@mui/material";

const data = [
  { name: "Jan", value: 70 },
  { name: "Feb", value: 80 },
  { name: "Mar", value: 60 },
  { name: "Apr", value: 40 },
  { name: "May", value: 70 },
  { name: "Jun", value: 20 },
  { name: "Jul", value: 40 },
  { name: "Aug", value: 60 },
  { name: "Sep", value: 70 },
  { name: "Oct", value: 90 },
  { name: "Nov", value: 80 },
  { name: "Dec", value: 20 },
];

const AnalyticsGraph = () => {
  return (
    <main style={{ padding: " 0 20px" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", padding: "20px 0 " }}>
        Analytics{" "}
      </Typography>
      <Divider />

      <Box p="20px 0">
        <TableContainer component={Paper}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            padding="0.5rem "
            backgroundColor="#f7f7f7"
          >
            <Typography variant="h5">Expenses </Typography>

            <Box display="flex" gap={1}>
              <Select size="small">
                <MenuItem value="date" divider={true}>
                  Sort by Date
                </MenuItem>
                <MenuItem value="amount">Sort by Amount</MenuItem>
              </Select>
            </Box>
          </Box>
          <div style={{ width: "100%", height: 500 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="1 1" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
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
