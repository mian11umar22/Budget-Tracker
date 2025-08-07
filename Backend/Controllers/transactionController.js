const Transactions = require("../Models/transactionModel");
const { v4: uuidv4 } = require("uuid");
exports.getTransactions = (req, res) => {
  try {
    const transactions = Transactions.getTransactions();
    res.status(200).json(transactions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching transactions", error: error.message });
  }
};

exports.createTransaction = (req, res) => {
  try {
    const { title, amount, type, category } = req.body;
console.log("REQ BODY:", req.body);

    if (!title || typeof title !== "string") {
      return res
        .status(400)
        .json({ message: "Title is required and cannot be empty." });
    }
    if (typeof amount !== "number" || amount <= 0) {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number." });
    }
    if (type !== "income" && type !== "expense") {
      return res
        .status(400)
        .json({ message: 'Type must be either "income" or "expense".' });
    }

    const newTransaction = {
      id: uuidv4(),
      title,
      amount,
      category,
      type,
      date: new Date().toISOString(),
    };

    const transactions = Transactions.getTransactions();
    transactions.push(newTransaction);
    Transactions.saveTransactions(transactions);

    res
      .status(201)
      .json({ message: "Transaction created successfully", newTransaction });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating transaction", error: error.message });
  }
};

exports.deleteTransaction = (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Transaction ID is required." });
    }

    const transactions = Transactions.getTransactions();
    const index = transactions.findIndex((t) => t.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "Transaction not found." });
    }

    transactions.splice(index, 1);
    Transactions.saveTransactions(transactions);

    res.status(200).json({ message: "Transaction deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting transaction", error: error.message });
  }
};

