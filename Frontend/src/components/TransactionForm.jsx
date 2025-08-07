import { toast } from "react-hot-toast";
import { FaTag } from "react-icons/fa";
import { useState } from "react";

export default function TransactionForm({ onAdd }) {
  const [type, setType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      title: formData.get("title"),
      amount: Number(formData.get("amount")),
      type: formData.get("type"),
      category: formData.get("category"),
    };

    try {
      await onAdd(data);
      e.target.reset();
      setType("");
    } catch (err) {
      toast.error("Error submitting transaction");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 md:p-8 rounded-lg shadow-md space-y-6 w-full"
    >
      <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
        <span className="text-xl">➕</span> Add Transaction
      </h2>

      {/* Title */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Transaction Title
        </label>
        <input
          type="text"
          name="title"
          required
          placeholder="e.g., Grocery shopping, Salary, etc."
          className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        />
      </div>

      {/* Amount */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Amount</label>
        <div className="flex items-center bg-gray-50 border border-gray-300 rounded-md px-3">
          <span className="text-gray-500 mr-2">$</span>
          <input
            type="number"
            name="amount"
            required
            placeholder="0.00"
            className="w-full py-2 bg-transparent focus:outline-none text-sm"
          />
        </div>
      </div>

      {/* Category */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <div className="flex items-center bg-gray-50 border border-gray-300 rounded-md px-3">
          <FaTag className="text-gray-400 mr-2" />
          <input
            type="text"
            name="category"
            required
            placeholder="Select a category"
            className="w-full py-2 bg-transparent focus:outline-none text-sm"
          />
        </div>
      </div>

      {/* Transaction Type */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-2">
          Transaction Type
        </label>
        <div className="flex flex-wrap items-center gap-6">
          <label className="flex items-center gap-1 text-red-500">
            <input
              type="radio"
              name="type"
              value="expense"
              required
              checked={type === "expense"}
              onChange={() => setType("expense")}
              className="accent-red-500"
            />
            <span>Expense</span>
          </label>
          <label className="flex items-center gap-1 text-green-600">
            <input
              type="radio"
              name="type"
              value="income"
              required
              checked={type === "income"}
              onChange={() => setType("income")}
              className="accent-green-500"
            />
            <span>Income</span>
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition"
      >
        Add Transaction
      </button>
    </form>
  );
}
