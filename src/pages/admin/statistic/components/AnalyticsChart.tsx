// import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area
} from "recharts";

const data = [
  { day: "Mon", value: 200 },
  { day: "Tue", value: 400 },
  { day: "Wed", value: 350 },
  { day: "Thu", value: 1000 },
  { day: "Fri", value: 700 },
  { day: "Sat", value: 1200 },
  { day: "Sun", value: 850 },
];

export default function AnalyticsChart() {
  return (
    <div className="w-full h-full p-5 bg-white rounded-2xl shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Analytics</h2>

        <div className="flex items-center gap-2 border rounded-lg px-3 py-1 text-sm text-gray-600">
          <span>📅</span>
          <span>19 Aug – 25 Aug</span>
        </div>
      </div>

      {/* Amounts */}
      <div className="flex items-center gap-10 mb-5">
        <div className="flex items-center gap-2">
          <span className="bg-orange-100 text-orange-500 px-2 py-1 rounded-full">
            ↑
          </span>
          <p className="text-lg font-semibold">$5.850</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="bg-orange-100 text-orange-500 px-2 py-1 rounded-full">
            ↓
          </span>
          <p className="text-lg font-semibold">$1.750</p>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid vertical={false} stroke="#f3f3f3" />

            <XAxis dataKey="day" tick={{ fill: "#9ca3af" }} />
            <YAxis hide />

            <Tooltip
              cursor={false}
              content={({ active, payload }) =>
                active && payload.length ? (
                  <div className="bg-white shadow-lg px-3 py-2 rounded-xl border text-sm">
                    <p className="font-semibold">${payload[0].value}</p>
                    <p className="text-gray-500">22 August, 2019</p>
                  </div>
                ) : null
              }
            />

            {/* Background Area */}
            <Area
              type="monotone"
              dataKey="value"
              stroke="none"
              fill="#fdd9b5"
              fillOpacity={0.4}
            />

            {/* Line */}
            <Line
              type="monotone"
              dataKey="value"
              stroke="#ff8a00"
              strokeWidth={3}
              dot={{ r: 5, fill: "#ff8a00" }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
