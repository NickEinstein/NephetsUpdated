import React from "react";
import BalanceInfo from "./BalanceInfo";
import LineChartExample from "./LineChartExample";
import TransactionRow from "./TransactionRow";
import FilterSection from "./FilterSection";
import TransactionList from "./TransactionList";

function Home() {
  return (
    <main className="w-full px-[8%] degular">
      <div className="flex items-start mt-12">
        {/* Balance Section */}
        <BalanceInfoSection />
        {/* Filter Section */}
        <FilterSection />
      </div>
      {/* Chart */}
      <LineChartExample />
      {/* Transaction List */}
      <TransactionList />
    </main>
  );
}

// Balance Section Component
const BalanceInfoSection = () => {
  // Fetch balance information from your API
  const wallet = {}; // Replace with actual data

  return (
    <div className="w-full">
      {/* Balance Information */}
      <BalanceInfo wallet={wallet} />
    </div>
  );
};

export default Home;
