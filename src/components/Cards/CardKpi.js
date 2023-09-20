import { useSelector } from "react-redux";
import transactionImg from "../../assets/transaction.png";
import salesImg from "../../assets/salesImg.png";
import profitImg from "../../assets/profit.png";
import Card from "./Card";

export function TotalTransactions() {
  const data = useSelector(
    (state) => state.apiDataReducer.filterDataLandingPage
  );
  const TotalTransactions = data.length;
  return (
    <Card
      title="Transactions"
      value={data.length !== 0 ? TotalTransactions : ""}
      image={transactionImg}
    />
  );
}

export function TotalSales() {
  const data = useSelector(
    (state) => state.apiDataReducer.filterDataLandingPage
  );

  let sum = 0;
  data.forEach((obj) => {
    sum += obj["revenue"];
  });
  sum = (sum / 1000000).toFixed(2);

  return (
    <Card
      title="Total Revenue"
      value={data.length !== 0 ? `$${sum}M` : ""}
      image={salesImg}
    />
  );
}

export function Profit() {
  const data = useSelector(
    (state) => state.apiDataReducer.filterDataLandingPage
  );
  let sumCost = 0;
  let sumRevenue = 0;
  data.forEach((obj) => {
    sumRevenue += obj["revenue"];
    sumCost += obj["cost"];
  });
  let profit = sumRevenue - sumCost;

  let percentageProfit = ((profit / sumCost) * 100).toFixed(2);

  return (
    <Card
      title="Profit"
      value={data.length !== 0 ? `${percentageProfit}%` : ""}
      image={profitImg}
    />
  );
}
