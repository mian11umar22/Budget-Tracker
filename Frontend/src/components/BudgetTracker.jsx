import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import Summary from "./Summary";
import CategoryChart from "./CategoryChart";

 
const BASE_URL = "https://budget-tracker-f623.onrender.com";

export default function BudgetTracker() {
  const [transactions, setTransactions] = useState([]);

 
  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/transactions`);
      setTransactions(res.data);
    } catch (err) {
      toast.error("Failed to fetch transactions");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

 
  const addTransaction = async (transaction) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/create/transactions`,
        transaction
      );
      setTransactions((prev) => [...prev, res.data.newTransaction]);
      toast.success("Transaction added");
    } catch (err) {
      toast.error("Failed to add transaction");
    }
  };

  // Delete
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/transactions/${id}`);
      setTransactions((prev) => prev.filter((tx) => tx.id !== id));
      toast.success("Transaction deleted");
    } catch (err) {
      toast.error("Failed to delete transaction");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="max-w-5xl mx-auto py-8 space-y-8 w-full">
        <h1 className="text-3xl font-bold text-center text-blue-800">
          💸 Budget Tracker
        </h1>

        <Summary transactions={transactions} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TransactionForm onAdd={addTransaction} />
          <CategoryChart transactions={transactions} />
        </div>

        <TransactionList
          transactions={transactions}
          onDelete={deleteTransaction}
        />
      </div>
    </div>
  );
}
