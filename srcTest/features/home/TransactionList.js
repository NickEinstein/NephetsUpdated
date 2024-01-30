// TransactionList.js
import React from "react";
import TransactionRow from "./TransactionRow";

const TransactionList = () => {
  // Fetch transaction data from your API
  const transactions = []; // Replace with actual data

  return (
    <div>
      {transactions.map((item) => (
        <TransactionRow key={item.id} items={item} />
      ))}
    </div>
  );
};

export default TransactionList;
