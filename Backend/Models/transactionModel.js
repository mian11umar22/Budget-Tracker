const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../Data/transactions.json");
const getTransactions = () => {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf-8");
    if (!data || data.trim() === "") {
      return []; 
    }
    return JSON.parse(data);
  }
  return [];
};
const saveTransactions = (transactions) => {
  fs.writeFileSync(filePath, JSON.stringify(transactions));
};

module.exports = {
  getTransactions,
  saveTransactions,
};
