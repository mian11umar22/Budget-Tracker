import { FaTrash, FaTag, FaCalendarAlt } from "react-icons/fa";

export default function TransactionList({
  transactions,
  onDelete,
  deletingId,
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
     
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
          <span className="text-xl">💲</span> Recent Transactions
        </h2>
        <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full self-start sm:self-auto">
          {transactions.length} total
        </span>
      </div>

      
      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions found.</p>
      ) : (
        <ul className="space-y-4">
          {transactions.map((tx) => {
            const isExpense = tx.type === "expense";

            return (
              <li
                key={tx.id}
                className="bg-gray-50 p-4 rounded-lg border flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                {/* Left Info Block */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg text-gray-800">
                      {tx.title}
                    </h3>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        isExpense
                          ? "bg-red-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {tx.type}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <FaTag className="text-gray-400" />
                      <span>{tx.category}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt className="text-gray-400" />
                      <span>{new Date(tx.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Right Info Block */}
                <div className="flex items-center justify-between md:justify-end gap-6 md:gap-4">
                  <span
                    className={`font-semibold text-lg ${
                      isExpense ? "text-red-500" : "text-green-600"
                    }`}
                  >
                    {isExpense ? "-" : "+"}${Number(tx.amount).toFixed(2)}
                  </span>
                  <button
                    onClick={() => onDelete(tx.id)}
                    disabled={deletingId === tx.id}
                    className="text-red-500 hover:text-red-700 transition"
                    title="Delete"
                  >
                    {deletingId === tx.id ? "..." : <FaTrash />}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
