export default function Summary({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-green-100 p-4 rounded shadow">
        <h4 className="text-sm text-gray-600">Total Income</h4>
        <p className="text-2xl font-bold text-green-700">
          ${income.toFixed(2)}
        </p>
      </div>
      <div className="bg-red-100 p-4 rounded shadow">
        <h4 className="text-sm text-gray-600">Total Expense</h4>
        <p className="text-2xl font-bold text-red-700">${expense.toFixed(2)}</p>
      </div>
      <div className="bg-blue-100 p-4 rounded shadow">
        <h4 className="text-sm text-gray-600">Current Balance</h4>
        <p className="text-2xl font-bold text-blue-700">
          ${balance.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
