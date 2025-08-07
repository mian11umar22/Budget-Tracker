import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = [
  "#3b82f6", // Blue
  "#10b981", // Green
  "#f59e0b", // Amber
  "#ef4444", // Red
  "#8b5cf6", // Purple
  "#ec4899", // Pink
];

const CategoryChart = ({ transactions }) => {
  const expenses = transactions.filter((tx) => tx.type === "expense");

  // Calculate totals per category
  const categoryTotals = {};
  expenses.forEach((tx) => {
    categoryTotals[tx.category] =
      (categoryTotals[tx.category] || 0) + tx.amount;
  });

  const total = Object.values(categoryTotals).reduce((a, b) => a + b, 0);

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: COLORS.slice(0, Object.keys(categoryTotals).length),
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#374151", // text-gray-700
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const amount = context.raw;
            const percent = ((amount / total) * 100).toFixed(1);
            return `${context.label}: $${amount.toFixed(2)} (${percent}%)`;
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full space-y-6">
      <h2 className="text-xl font-semibold text-blue-900 flex items-center gap-2">
        <span>🕒</span> Expense Categories
      </h2>

      {expenses.length === 0 ? (
        <p className="text-gray-500">No expense data to show.</p>
      ) : (
        <>
          <div className="w-full h-64 md:h-72">
            <Pie data={data} options={options} />
          </div>

          {/* Category Breakdown Table */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-700">
              Top Categories
            </h3>
            {Object.entries(categoryTotals).map(([cat, amt], index) => {
              const color = COLORS[index % COLORS.length];
              const percent = ((amt / total) * 100).toFixed(1);
              return (
                <div
                  key={cat}
                  className="flex justify-between items-center text-sm text-gray-600"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <span>{cat}</span>
                  </div>
                  <div className="text-right">
                    <span>${amt.toFixed(2)}</span>{" "}
                    <span className="text-gray-400">({percent}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryChart;
